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
      <div
        className="
          w-full
          grid
          grid-cols-2
          gap-4
          overflow-hidden
        "
      >
        {imageSrc.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            className="
              w-full
              h-48
              object-cover
              rounded-md
              cursor-pointer   // Add cursor pointer for clickable effect
            "
            alt={`Image ${index + 1}`}
            onClick={() => openImageModal(imageUrl)}
          />
        ))}
      </div>

      <div
        className="
          absolute
          top-5
          right-5
        "
      >
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
