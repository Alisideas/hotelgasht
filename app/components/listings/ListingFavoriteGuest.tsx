"use client";

import React from 'react';
import Image from "next/image";
import Rating from '../Rating';

interface ListingFavoriteGuestProps {
    isActive: boolean;
}

const ListingFavoriteGuest: React.FC<ListingFavoriteGuestProps> = ({ isActive }) => {
    if (isActive) {
        return (
            <div>
                <hr />
                <div className="flex items-center justify-between w-full h-28 border border-gray-400 rounded-md px-4">
                    <div className="flex ml-5 items-center">
                        <Image
                            className="cursor-pointer"
                            src="/images/favorite2.png"
                            height="150"
                            width="150"
                            alt="Favorite"
                        />
                        <div className="text-s ml-7 font-bold">One of the most loved homes on Hotelgasht, according to guests</div>
                    </div>
                    <div className='mr-8 text-lg font-semibold'>
                        Rate
                        <Rating initialValue={3} />
                    </div>
                </div>
                <hr />
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default ListingFavoriteGuest;
