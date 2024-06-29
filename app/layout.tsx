import { Nunito } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import SlideShowModal from "./components/modals/SlideShowModal";
import MyDocument from "./livechat";
import LiveChat from "./livechat";
import SocialMedias from "./components/SocialMedias";

export const metadata = {
  title: "Hotel Gasht",
  description: "rent your hotel in hotelgasht.online",
  image:
    "https://res.cloudinary.com/dbm8ncouc/image/upload/v1710714622/u84dz94tw2njqtnoxgcv.jpg",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <SlideShowModal />
          <Navbar currentUser={currentUser} />
          <LiveChat />
          <div className="hidden md:block lg:block xl:block 2xl:block fixed bottom-60 w-full">
            <SocialMedias />
          </div>
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
