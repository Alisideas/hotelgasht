import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Resend } from "resend";

interface IParams {
  reservationId?: string;
}

export async function PUT(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Assuming you want to update the reservation's isApproved field to true
  const updatedReservation = await prisma.reservation.update({
    where: { id: reservationId },
    data: { isApproved: true }, // Update isApproved to true
  });

  const approvedHotel = new Resend('re_NUpAMvUb_8ydSZaxQPfLwWrLuBRaiXDSc');
    await approvedHotel.emails.send({
      from: 'Hotelgasht@hotelgasht.com',
      to: currentUser.email || 'Alirezajj118@gmail.com',
      subject: 'Reservation Confirmation',
      html: `
        <p>Your reservation for the listing has been Approved by the Admin!</p>
        <p>Reservation details:</p>
        <ul>
          <li>Start Date: ${updatedReservation.startDate}</li>
          <li>End Date: ${updatedReservation.endDate}</li>
          <li>Total Price: ${updatedReservation.totalPrice}</li>
        </ul>
        <p>We look forward to hosting you in hotel gasht!</p>
      `,
    });

  return NextResponse.json(updatedReservation);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}
