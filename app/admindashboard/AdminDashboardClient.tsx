"use client";

import { SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import useLoginModal from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import { useCallback, useState } from "react";
import PropertiesClient from "../properties/PropertiesClient";
import AllProperties from "../components/AllProperties";

interface AdminDashboardCllientProps {
  currentUser?: SafeUser | null;
  listings?: SafeListing[];
}

const AdminDashboardCllient: React.FC<AdminDashboardCllientProps> = ({
  currentUser,
  listings,
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
        <hr className="mt-10"/>
        <div>
        <AllProperties listings={listings || []}/>
        </div>
        
      </Container>
    </div>
  );
};

export default AdminDashboardCllient;
