'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from 'date-fns';
import { TbClock, TbCircleCheck } from 'react-icons/tb';
import useCountries from "@/app/hooks/useCountries";
import {
  SafeListing,
  SafeReservation,
  SafeUser
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import Rating from "../Rating";
import Heading from "../Heading";
import axios from "axios";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const [isReservationApproved, setIsReservationApproved] = useState(reservation?.isApproved || false);


  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

    const handleApprove = async () => {
      try {
        // Assuming you have the reservation ID stored in reservation.id
        const reservationId = reservation?.id;
    
        // Send a request to update the reservation status
        await axios.put(`/api/reservations/${reservationId}`, { isApproved: true });
    
        // Update the local state or trigger any necessary actions
        setIsReservationApproved(true);
      } catch (error) {
        console.error('Error approving reservation:', error);
        // Handle errors accordingly
      }
    };
  

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const getRandomDate = () => {
    const randomOffset = Math.floor(Math.random() * 9); // Random number between 0 and 6
    const today = new Date();
    today.setDate(today.getDate() + randomOffset);
    return today;
  };
  const getRandomDate2 = () => {
    let randomOffset = Math.floor(Math.random() * 9); // Random number between 0 and 6
    const firstDate = getRandomDate();
    const secondDate = new Date(firstDate.getTime());
    while (secondDate < firstDate) {
      randomOffset = Math.floor(Math.random() * 9); // Generate a new random offset until the second date is greater than the first
      secondDate.setDate(firstDate.getDate() + randomOffset);
    }
    return secondDate;
  };

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        {onAction && actionLabel == "Cancel reservation" && (
          <div>
            {reservation?.isApproved == false &&
              (
                <div className="flex flex-row items-center gap-1 justify-between">
                  <Heading title={"Not approved"} subtitle="Please wait for host to approve reservation" />
                  <TbClock size={45} />
                </div>
              ) ||
              <div className="flex flex-row items-center gap-1 justify-between">
                <Heading title={"Approved"} subtitle="Your reservation has been approved" />
                <TbCircleCheck size={45} />
              </div>
            }
          </div>

        )}
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc[0]}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 w-full">

          <div className="font-semibold text-lg">
            {location?.label}
          </div>
          <div className="ml-auto"><Rating initialValue={0} />
          </div>
        </div>
        <div className="w-full mt-0">
          {data.title}
        </div>

        <div className="font-light text-neutral-500">
          <div>
            {reservation?.startDate && reservation?.endDate ? reservationDate : format(getRandomDate(), 'MMM d') + format(getRandomDate2(), ' - d')}
          </div>
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel == 'Cancel guest reservation' && (
          <Button
            disabled={disabled}
            approved
            label={'Approve'}
            onClick={handleApprove}
          />
        )}

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}

      </div>
    </div>
  );
}

export default ListingCard;