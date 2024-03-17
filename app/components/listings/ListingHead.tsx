import React, { useState } from "react";
import Modal from "react-modal";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

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

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative w-full grid grid-cols-2 gap-1 overflow-hidden">
        <img
          src={imageSrc[0]}
          className="w-full h-[504px] object-cover rounded-md rounded-r-none cursor-pointer hover:opacity-80"
          alt="Image 1"
          onClick={() => openImageModal(imageSrc[0])}
        />
        <div className="flex-row grid grid-cols-2 gap-1">
          {imageSrc.slice(1, 5).map((imageUrl, index) => (
            <img
              key={index + 1}
              src={imageUrl}
              className="w-full h-[250px] object-cover rounded-md rounded-l-none cursor-pointer hover:opacity-80"
              alt={`Image ${index + 2}`}
              onClick={(event) => handleImageClick(imageUrl, event)}
            />
          ))}
        </div>
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
        <button onClick={closeImageModal} className="absolute top-5 right-5 mt-10 rounded-full bg-gray-300 p-2 hover:bg-gray-400 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 21 21" fill="currentColor">
            <path fillRule="evenodd" d="M13.414 10l4.293-4.293a1 1 0 0 0-1.414-1.414L12 8.586l-4.293-4.293a1 1 0 1 0-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 0 0 1.414 1.414L12 11.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 10z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="gallery w-full items-center justify-center flex flex-col">
          {imageSrc.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Gallery Image ${index + 1}`}
              className="gallery-image w-1/2 h-1/2 object-cover mt-2"
              onClick={(event) => handleImageClick(imageUrl, event)}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ListingHead;
