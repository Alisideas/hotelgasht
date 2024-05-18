import React, { useState } from "react";
import Modal from "react-modal";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { FiShare } from "react-icons/fi";
import { Carousel } from "react-responsive-carousel"; // Import Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import useSlideShow from "@/app/hooks/useSlideShow";
import SlideShowModal from "../modals/SlideShowModal";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const slideShowModal = useSlideShow();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleImageClick = (
    imageUrl: string,
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.stopPropagation();
    openImageModal(imageUrl);
  };

  const metaData = {
    imageSrc: imageSrc[0],
    title: "Listing Head",
    description: "Listing Head description",
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-8">
        <Heading
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
        <button
          onClick={() => {
            const shareTitle = title; // Title of the listing
            const shareSubtitle = `${location?.region}, ${location?.label}`; // Subtitle of the listing
            const shareImage = imageSrc[0]; // URL of the first image

            const shareMessage = `${shareTitle}\n${shareSubtitle}`; // Constructing the message

            const shareData = {
              title: metaData.title,
              text: metaData.description,
              url: window.location.href,
              imageSrc: metaData.imageSrc,
            };

            if (navigator.share) {
              navigator.share(shareData);
            } else {
              alert("Sharing not supported on this device.");
            }
          }}
          className="hover:bg-slate-100 text-black px-4 py-2 rounded-md"
        >
          <div className="flex flex-row items-center gap-2">
            <FiShare />
            <p className="underline text-sm">Share</p>
          </div>
        </button>
      </div>
      <div className="relative w-full grid grid-cols-2 gap-1 overflow-hidden">
        <img
          src={imageSrc[0]}
          className="w-full h-[504px] object-cover rounded-md rounded-r-none cursor-pointer hover:opacity-80 hidden md:block"
          alt="Image 1"
          onClick={() => openImageModal(imageSrc[0])}
        />
        <div className="flex-row grid grid-cols-2 gap-1">
          {imageSrc.slice(1, 5).map((imageUrl, index) => (
            <img
              key={index + 1}
              src={imageUrl}
              className="w-full h-[250px] object-cover rounded-md rounded-l-none cursor-pointer hover:opacity-80 hidden md:block"
              alt={`Image ${index + 2}`}
              onClick={(event) => handleImageClick(imageUrl, event)}
            />
          ))}
        </div>
      </div>

      {/* mobile view */}
      <div className="block md:hidden w-full">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows
          showIndicators={false}
          showThumbs={false}
        >
          {imageSrc.map((imageUrl, index) => (
            <div key={index} className="w-full object-cover">
              <img
                src={imageUrl}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-[250px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
      <Modal
        className="modal"
        isOpen={!!selectedImage}
        onRequestClose={closeImageModal}
        contentLabel="Selected Image"
      >
        <button
          onClick={closeImageModal}
          className="absolute top-5 right-5 mt-10 rounded-full bg-gray-300 p-2 hover:bg-gray-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600"
            viewBox="0 0 21 21"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.414 10l4.293-4.293a1 1 0 0 0-1.414-1.414L12 8.586l-4.293-4.293a1 1 0 1 0-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 0 0 1.414 1.414L12 11.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="grid gap-4 md:grid-cols-2">
          {imageSrc.map((imageUrl, index) => (
            <img
              onClick={slideShowModal.onOpen}
              key={index}
              src={imageUrl}
              alt={`Gallery Image ${index + 1}`}
              className={`rounded-lg cursor-pointer ${
                index === 0 || index % 3 === 0
                  ? "md:col-span-2"
                  : "md:col-span-1"
              }`}
            />
          ))}
        </div>
      </Modal>
      {slideShowModal.isOpen && <SlideShowModal images={imageSrc} />}
    </>
  );
};

export default ListingHead;
