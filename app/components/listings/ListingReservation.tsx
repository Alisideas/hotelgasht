import React, { useState } from 'react';
import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

interface ListingReservationProps {
  price: number;
  guestCount: number;
  dateRange: Range;
  totalPrice: number;
  taxPrice?: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  guestCount,
  dateRange,
  totalPrice,
  taxPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,

}) => {
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);

  const handleNumberOfGuestsChange = (value: number) => {
    setNumberOfGuests(value);
  };

  const totalWithTax = taxPrice ? totalPrice + (totalPrice * (taxPrice / 100)) : totalPrice;
  const numberOfNights= Math.ceil((dateRange.endDate!.getTime() - dateRange.startDate!.getTime()) / (1000 * 3600 * 24))

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Counter
          onChange={handleNumberOfGuestsChange}
          value={numberOfGuests}
          title="Guests"
          subtitle="How many guests are coming?"
          max={guestCount}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
        <div className='text-neutral-500 mt-4 items-center justify-center flex flex-row'>
          You won&apos;t be charged yet
        </div>
        <div className='flex flex-row items-center justify-between text-sm mt-5'>
          <div className='underline'>
          {price} x {numberOfNights} nights
          </div>
          <div>$ {totalPrice}</div>
        </div>
        <div className='flex flex-row items-center justify-between text-sm mt-5'>
          <div className='underline'>
          Tax for {numberOfNights} nights
          </div>
          <div>$ {totalPrice * (taxPrice! / 100)}</div>
        </div>
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total after Tax</div>
        <div>$ {totalWithTax}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
