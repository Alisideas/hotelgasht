'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { homeOption } from "@/app/components/navbar/HomeOptions";
import Heading from "@/app/components/Heading";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) =>
      items.label === listing.category);
  }, [listing.category]);


  const option = useMemo(() => {
    return homeOption.find((items: any) =>
      items.label === listing.option);
  }, [listing.option]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price + (listing.taxprice ?? 0));
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
    [
      totalPrice,
      dateRange,
      listing?.id,
      router,
      currentUser,
      loginModal
    ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }

    }
  }, [dateRange, listing.price]);

  return (
    <div>
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          mt-14
        "
      >
        <div className="flex flex-col gap-5">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              option={listing.option}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomeCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                guestCount={listing.guestCount}
                price={listing.price}
                totalPrice={totalPrice}
                taxPrice={listing.taxprice ?? undefined}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
          <hr />
          <Heading title="Things to know" />
          <div className="flex flex-row justify-between gap-8">
            <div>
              <h3 className="p-3 text-lg font-bold">House Rules</h3>
              <ul>
                <li className="p-3">
                  Check-in: 14:00 PM
                </li >
                <li className="p-3">
                  Checkout before 12:00 PM
                </li>
                <li className="p-3">
                  {listing.guestCount} guests maximum
                </li>
              </ul>
            </div>
            <div>
              <h3 className="p-3 text-lg font-bold">Safety & property</h3>
              <ul>
                <li className="p-3">
                Carbon monoxide alarm not reported
                </li >
                <li className="p-3">
                Smoke alarm not reported
                </li>
              </ul>
            </div>
            <div>
              <h3 className="p-3 text-lg font-bold">Cancellation policy</h3>
              <ul>
                <li className="p-3">
                This reservation is non-refundable.
                </li >
                <li className="p-3 w-[70%]">
                Review the Host’s full cancellation policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
    {/* <hr />
    <div className="bg-[#f5f5f5] w-full h-full">
      <div>
        <h2>
        Support
        </h2>
        we are here for your
      </div>
    </div> */}
    </div>
    
  );
}

export default ListingClient;