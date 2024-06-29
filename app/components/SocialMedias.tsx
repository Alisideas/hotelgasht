"use client";

import { BsInstagram, BsTelegram, BsWhatsapp } from "react-icons/bs";

const SocialMedias = () => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-center pl-2 w-[50px] h-[50px] border-2 rounded-r-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        onClick={() => window.open("https://www.instagram.com/hotel__gasht/", "_blank")}
      >
        <BsInstagram
          size={30}
          color="white"
          className="cursor-pointer hover:scale-110 transition duration-300"
        />
      </div>
      <div
        className="flex items-center justify-center pl-2 w-[50px] h-[50px] border-2 rounded-r-lg bg-green-500"
        onClick={() => window.open("https://wa.me/+905356558810", "_blank")}
      >
        <BsWhatsapp
          size={30}
          color="white"
          className="cursor-pointer hover:scale-110 transition duration-300"
        />
      </div>
      <div
        className="flex items-center justify-center pl-2 w-[50px] h-[50px] border-2 rounded-r-lg bg-blue-500"
        onClick={() => window.open("https://t.me/+905356558810", "_blank")}
      >
        <BsTelegram
          size={30}
          color="white"
          className="cursor-pointer hover:scale-110 transition duration-300"
        />
      </div>
    </div>
  );
};

export default SocialMedias;
