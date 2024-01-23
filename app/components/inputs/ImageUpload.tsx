// Import necessary libraries and components
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = "r2buldnk";

interface ImageUploadProps {
  onChange: (values: string[]) => void;
  values?: string[]; // Make values optional
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, values = [] }) => {
  const handleUpload = useCallback((result: any) => {
    // Ensure values is always an array before updating
    onChange(Array.isArray(values) ? [...values, result.info.secure_url] : [result.info.secure_url]);
  }, [onChange, values]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        // Allow uploading multiple files
        maxFiles: 5  // You can adjust this based on your requirements
      }}
    >
      {({ open }) => (
        <div>
          {/* Render each uploaded image */}
          

          {/* Add the option to upload more images */}
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            {Array.isArray(values) &&
            values.map((imageUrl, index) => (
              <div key={index} className="relative inline-block">
                <Image
                  style={{ objectFit: 'cover' }} 
                  src={imageUrl} 
                  alt={`Image ${index + 1}`} 
                  width={350}
                  height={350}
                />
                {/* Add a remove button for each image */}
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => {
                    const updatedValues = [...values];
                    updatedValues.splice(index, 1);
                    onChange(updatedValues);
                  }}
                >
                  X
                </button>
              </div>
            ))
          }
            <div className="font-semibold text-lg">
              Click to upload
            </div>
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
}

export default ImageUpload;
