import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bedCount?: number;
  bathroomeCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  taxprice?: number;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      bedCount,
      guestCount, 
      bathroomeCount, 
      locationValue,
      startDate,
      endDate,
      category,
      taxprice
    } = params;

    let query: any = {};

    if (taxprice) {
      query.tax = {
        gte: +taxprice
      }
    }

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }
    if (bedCount) {
      query.bedCount = {
        gte: +bedCount
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      };
    }

    if (bathroomeCount) {
      query.bathroomCount = {
        gte: +bathroomeCount
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      imageSrc: Array.isArray(listing.imageSrc) ? listing.imageSrc : [listing.imageSrc],
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
