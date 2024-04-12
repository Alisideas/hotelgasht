import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  title?: string;
  price?: number;
}
export async function PUT(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    const { listingId } = params;
    const body: IParams = await request.json();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const { title, price } = body;
  
    if (!title && !price) {
      throw new Error('No update parameters provided');
    }
  
    const dataToUpdate: IParams = {};
    if (title) dataToUpdate.title = title;
    if (price) dataToUpdate.price = parseFloat(price);
  
    const listing = await prisma.listing.update({
      where: {
        id: listingId,
        userId: currentUser.id
      },
      data: dataToUpdate
    });
  
    return NextResponse.json(listing);
  }
  