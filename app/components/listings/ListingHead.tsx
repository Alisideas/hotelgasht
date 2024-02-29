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

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative w-full grid grid-cols-2 gap-4 overflow-hidden">
        {/* First Image (half width) */}
        <img
          src={imageSrc[0]}
          className="w-full h-52 object-cover rounded-md cursor-pointer"
          alt="Image 1"
          onClick={() => openImageModal(imageSrc[0])}
        />

        {/* Rest of the Images (half width) */}
        <div className="flex-row grid grid-cols-2 gap-2">
          {imageSrc.slice(1).map((imageUrl, index) => (
            <img
              key={index + 1}
              src={imageUrl}
              className="w-full h-24 object-cover rounded-md cursor-pointer"
              alt={`Image ${index + 2}`}
              onClick={() => openImageModal(imageUrl)}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeImageModal}
        contentLabel="Selected Image"
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Image"
            className="w-full h-full object-contain"
          />
        )}
      </Modal>
    </>
  );
};

export default ListingHead;
