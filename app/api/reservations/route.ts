import { NextResponse } from "next/server";
import { Resend } from 'resend';
import axios from 'axios';

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
      include: {
        user: true, // Assuming that 'listing' has a relationship to 'user'
      },
    });

    // Send email notification to the user making the reservation
    const resendToUser = new Resend('re_NUpAMvUb_8ydSZaxQPfLwWrLuBRaiXDSc');
    await resendToUser.emails.send({
      from: 'Hotelgasht@hotelgasht.com',
      to: currentUser.email,
      subject: 'Reservation Confirmation',
      html: `
        <p>Your reservation for the listing "${listingAndReservation.title}" has been confirmed!</p>
        <p>Reservation details:</p>
        <ul>
          <li>Listing: ${listingAndReservation.title}</li>
          <li>Start Date: ${startDate}</li>
          <li>End Date: ${endDate}</li>
          <li>Total Price: ${totalPrice}</li>
        </ul>
        <p>We look forward to hosting you!</p>
      `,
    });

    // Send email notification to the owner of the listing
    const ownerEmail = listingAndReservation.user.email; // Assuming 'user' has an 'email' property
    const resendToOwner = new Resend('re_NUpAMvUb_8ydSZaxQPfLwWrLuBRaiXDSc'); // Replace with the actual API key for the owner
    await resendToOwner.emails.send({
      from: 'Hotelgasht@hotelgasht.com',
      to: ownerEmail,
      subject: 'New Reservation',
      html: `
        <p>You have a new reservation for your listing "${listingAndReservation.title}"!</p>
        <p>Reservation details:</p>
        <ul>
          <li>Start Date: ${startDate}</li>
          <li>End Date: ${endDate}</li>
          <li>Total Price: ${totalPrice}</li>
        </ul>
      `,
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
