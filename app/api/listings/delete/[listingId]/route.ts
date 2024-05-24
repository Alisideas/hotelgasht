import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  imageUrl?: string;
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { listingId, imageUrl } = body as IParams;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid or missing listing ID");
  }

  if (!imageUrl || typeof imageUrl !== "string") {
    throw new Error("Invalid or missing image URL");
  }

  const existingListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  if (!existingListing) {
    throw new Error("Listing not found or unauthorized to update");
  }

  const updatedImageSrc = existingListing.imageSrc.filter(img => img !== imageUrl);

  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      imageSrc: updatedImageSrc,
    },
  });

  return NextResponse.json(updatedListing);
}
