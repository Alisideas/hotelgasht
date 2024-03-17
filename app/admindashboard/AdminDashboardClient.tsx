"use client";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { useRouter } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import useRentModal from "../hooks/useRentModal";
import { useCallback, useState } from "react";

interface AdminDashboardCllientProps {
  currentUser?: SafeUser | null;
}

const AdminDashboardCllient: React.FC<AdminDashboardCllientProps> = ({
  currentUser,
}) => {

  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);


  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);
  return (
    <div className="mt-14">
      <Container>
      <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            border-sky-500
          "
        >
          Create New Home
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboardCllient;
