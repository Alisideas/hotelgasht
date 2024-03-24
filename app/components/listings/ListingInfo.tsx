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
import AvatarJoined from "../AvatarJoined";
import Button from "../Button";
import { MdVerifiedUser } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { LiaKeySolid } from "react-icons/lia";



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
  option: string[];
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
      <div>
        {guestCount > 3 && (
          <div>
            <ListingCategory
              icon={CiLocationOn}
              label={"Great location"}
              description={"95% of recent guests gave the location a 5-star rating."}
            />
            <div className="mt-6">
              <ListingCategory
                icon={LiaKeySolid}
                label={"Great check-in experience"}
                description={"95% of recent guests gave the check-in process a 5-star rating."}
              />
            </div>
          </div>

        ) || <ListingCategory
            icon={LiaKeySolid}
            label={"Great check-in experience"}
            description={"95% of recent guests gave the check-in process a 5-star rating."}
          />}
      </div>
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Heading title={"What this place offers"} />

      <div className="flex flex-wrap justify-between">
        {option.map((item) => {
          const matchedHomeOption = homeOption.find((homeOpt) => homeOpt.label === item);
          if (matchedHomeOption) {
            return (
              <div key={item} className="w-1/2 p-2">
                <ListingOption
                  icon={matchedHomeOption.icon}
                  label={item}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <Map center={coordinates} />
      <div className="flex flex-row items-center gap-2">
        <AvatarJoined src={user?.image} />
        <Heading
          title={`Hosted by ${user?.name}`}
          subtitle={`Joined ${user?.createdAt?.toString()}`}
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div><MdVerifiedUser /></div>
        <p>Identity verified</p>
      </div>

      <div className="w-28">
        <Button
          onClick={() => window.open(`https://wa.me/+905356558810`, "_blank")}
          outline
          small
          label="Contact Host"
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div><AiOutlineFileProtect size={24} /></div>
        <p className="text-sm w-[60%]">To protect your payment, never transfer money or communicate outside of the Hotelgasht website or whatsapp.</p>
      </div>
    </div>
  );
}

export default ListingInfo;