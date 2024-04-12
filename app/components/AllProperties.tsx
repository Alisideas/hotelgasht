import { useRouter } from "next/navigation";
import { SafeListing, SafeUser } from "../types";
import Container from "./Container";
import Heading from "./Heading";
import ListingCard from "./listings/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "./Button";


interface AllPropertiesProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null,
}

const AllProperties: React.FC<AllPropertiesProps> = ({
    listings,
    currentUser,
}) => {

    const [editingId, setEditingId] = useState(null);
    const [editableTitle, setEditableTitle] = useState('');
    const [editablePrice, setEditablePrice] = useState('');

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onEdit = (listing: any) => {
        setEditingId(listing.id);
        setEditableTitle(listing.title);
        setEditablePrice(listing.price);
    };

    const onUpdate = (id: any) => {
        axios.put(`/api/listings/update/${id}`, {
            title: editableTitle,
            price: editablePrice
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

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            <table className="w-[1750px] items-center justify-center">
                <thead>
                    <tr className="bg-gray-100 w-full">
                        <th className="py-2 px-4">Images</th>
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing: any) => (
                        <tr key={listing.id} className="border-b">
                            <td className="py-2 px-4 w-[200px] justify-center items-center">
                                <Image className="cursor-pointer" src={listing.imageSrc[0]} alt={listing.imageSrc[0]} width={100} height={100} objectFit="contain" />
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
        </div>
    );
}

export default AllProperties;
