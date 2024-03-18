'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import ListingFavoriteGuest from "./ListingFavoriteGuest";
import ListingOption from "./ListingOption";
import Heading from "../Heading";
import { homeOption } from "../navbar/HomeOptions";
import HomeOptionBox from "../inputs/HomeOptionInput";

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined,
  option: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined,
  optionTwo: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined,
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  option,
  optionTwo,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <ListingFavoriteGuest isActive={true} />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />

      )}

      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Heading title={"What this place offers"} />
      <div className="flex flex-wrap justify-center">
        {homeOption.map((item, index) => {
          if (index !== 1 && index !== 4 && index !== 5 && index !== 7 && index !== 11 && index !== 14) {
            return (
              <div key={item.label} className="w-1/3 p-2">
                <HomeOptionBox
                  onClick={() => { }}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <Heading title={"Special Offers"} />
      <div className="flex flex-wrap justify-start">
      {option && (
        <div key={option.label} className="w-1/3 p-2">
         <HomeOptionBox
         onClick={() => { }}
         label={option.label}
         icon={option.icon}
       />
       </div>
        
      )}
      {optionTwo && (
        <div key={optionTwo.label} className="w-1/3 p-2">
         <HomeOptionBox
         onClick={() => { }}
         label={optionTwo.label}
         icon={optionTwo.icon}
       />
       </div>
        
      )}
      
      
      </div>

      <hr />
      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;