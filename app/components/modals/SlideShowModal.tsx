'use client';

import React from "react";
import useSlideShow from "@/app/hooks/useSlideShow";
import { useState } from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import FullScreenModal from "./FullScreenModal";

interface SlideShowModalProps {
  images?: string[];
}

const SlideShowModal: React.FC<SlideShowModalProps> = ({ images }) => {
  const slideShowModal = useSlideShow();
  const [isLoading, setIsLoading] = useState(false);

  const zoomInProperties = {
    scale: 1,
    duration: 5000,
    transitionDuration: 300,
    infinite: true,
    prevArrow: (
      <div className="ml-10 top-40 md:top-72 rounded-full h-8 w-8 bg-black">
        <ArrowLeftIcon className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className="mr-10 top-40 md:top-72 rounded-full h-8 w-8 bg-black">
        <ArrowRightIcon className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
  };
  

  const bodyContent = (
    <div>
      <div className="w-full h-screen">
        <Zoom {...zoomInProperties}>
          {images?.map((imageUrl, index) => (
            <div
              key={index}
              className="flex justify-center md:items-center h-full w-full items-start relative"
            >
              <img className="object-contain w-[40%] " src={imageUrl} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Zoom>
      </div>
    </div>
  );

  return (
    <FullScreenModal
      onClose={slideShowModal.onClose}
      isOpen={slideShowModal.isOpen}
      onSubmit={() => {}}
      title="Slide Show"
      body={bodyContent}
      actionLabel="Slide Show"
    />
  );
};

export default SlideShowModal;
