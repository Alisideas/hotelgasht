import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  title?: string;
  price?: number;
  description?: string;
  imageSrc?: string[];
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid or missing listing ID");
  }

  const body: IParams = await request.json();
  const { title, price, description, imageSrc } = body;

  if (!title && !price && !description && !imageSrc) {
    throw new Error("No update parameters provided");
  }

  // Fetch the existing listing from the database
  const existingListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  if (!existingListing) {
    throw new Error("Listing not found or unauthorized to update");
  }

  // Append the new images to the existing images array
  const updatedImageSrc = existingListing.imageSrc
    ? [...existingListing.imageSrc, ...(imageSrc || [])]
    : imageSrc;

  // Update the listing with the new data
  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      title: title || existingListing.title,
      price: price !== undefined ? parseFloat(price.toString()) : existingListing.price,
      description: description || existingListing.description,
      imageSrc: updatedImageSrc,
    },
  });

  return NextResponse.json(updatedListing);
}
