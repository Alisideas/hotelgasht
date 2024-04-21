import { useRouter } from "next/navigation";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "./Button";
import { CldUploadWidget } from "next-cloudinary";
import ImageUploadExtera from "./inputs/ImageUploadExtera";

interface AllPropertiesProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
const uploadPreset = "r2buldnk";

const AllProperties: React.FC<AllPropertiesProps> = ({
    listings,
    currentUser,
}) => {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);


    const [editingId, setEditingId] = useState<string | null>(null);
    const [editableTitle, setEditableTitle] = useState('');
    const [editableImage, seteditableImage] = useState('');
    const [editablePrice, setEditablePrice] = useState('');
    const [editableDescription, setEditableDescription] = useState('');
    const [showImagesModal, setShowImagesModal] = useState<boolean>(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onEdit = (listing: SafeListing) => {
        setEditingId(listing.id);
        setEditableTitle(listing.title);
        setEditablePrice(listing.price.toString());
        setEditableDescription(listing.description);
    };

    // const handleImageChange = (updatedImages: string[]) => {
    //     setUploadedImages(updatedImages);
    // };
    const handleImageChange = (updatedImages: string[]) => {
        setUploadedImages(prevImages => [...prevImages, ...updatedImages]);
    };


    const onUpdate = (id: string) => {
        axios.put(`/api/listings/update/${id}`, {
            title: editableTitle,
            price: parseFloat(editablePrice),
            description: editableDescription,
            imageSrc: [...uploadedImages, ...selectedImages] // Send both existing and new images
        })
            .then(() => {
                toast.success('Listing updated');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            });
        setEditingId(null);
    };


    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing deleted');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);

    const openImagesModal = (images: string[]) => {
        setSelectedImages(images);
        setShowImagesModal(true);
    };

    const closeImagesModal = () => {
        setShowImagesModal(false);
    };

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            <table className="w-[1750px] items-center justify-center">
                <thead>
                    <tr className="bg-gray-100 w-full">
                        <th className="py-2 px-4">Images</th>
                        <th className="py-2 px-4">Image Action</th>
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing: SafeListing) => (
                        <tr key={listing.id} className="border-b">
                            <td className="py-2 px-4 w-[200px] justify-center items-center">

                                <Image
                                    className="cursor-pointer"
                                    src={listing.imageSrc[0]}
                                    alt={listing.imageSrc[0]}
                                    width={100}
                                    height={100}
                                    objectFit="contain"
                                    onClick={() => openImagesModal(listing.imageSrc)}
                                />


                            </td>
                            <td>
                                <ImageUploadExtera
                                    key={listing.id}
                                    onChange={handleImageChange}
                                    values={uploadedImages}
                                />
                            </td>

                            <td className="py-2 px-4 justify-center items-center text-center font-semibold text-lg">{editingId === listing.id ? (
                                <input type="text" value={editableTitle} onChange={(e) => setEditableTitle(e.target.value)} />
                            ) : (
                                <span>{listing.title}</span>
                            )}</td>
                            <td className="py-2 px-4 justify-center items-center text-center">{listing.id}</td>
                            <td className="py-2 px-4 justify-center items-center text-center font-bold">{editingId === listing.id ? (
                                <input type="text" value={editablePrice} onChange={(e) => setEditablePrice(e.target.value)} />
                            ) : (
                                <span>{listing.price}</span>
                            )}</td>
                            <td>
                                {editingId === listing.id ? (
                                    <input type="text" value={editableDescription} onChange={(e) => setEditableDescription(e.target.value)} />
                                ) : (
                                    <span>{listing.description}</span>
                                )}
                            </td>
                            <td className="py-2 px-4 justify-center items-center text-center ">
                                <div className="flex flex-row gap-2">
                                    {editingId === listing.id ? (
                                        <>
                                            <Button onClick={() => onUpdate(listing.id)} label={"Update"} />
                                            <Button outline onClick={() => setEditingId(null)} label={"Cancel"} />
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => onDelete(listing.id)} label={"Delete"} />
                                            <Button outline onClick={() => onEdit(listing)} label={"Edit"} />
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showImagesModal && (
                <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 overflow-y-auto rounded-lg h-[600px]">
                        <button className="absolute top-4 right-4 text-gray-500" onClick={closeImagesModal}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center flex-col ">
                            <div className="top-4 text-red-500 cursor-pointer" onClick={closeImagesModal}>X</div>
                            {selectedImages.map((imageUrl, index) => (
                                <div key={index} className="relative w-[400px] h-[400px] m-2">

                                    <Image
                                        src={imageUrl}
                                        alt={`Image ${index}`}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllProperties;
