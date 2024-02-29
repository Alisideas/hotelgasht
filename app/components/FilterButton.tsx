import React, { useState } from 'react';
import useSearchModal from '../hooks/useSearchModal';

interface FilterButtonProps {
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const searchModal = useSearchModal();

  return (
    <div className="flex items-center border border-gray-500 rounded-md flex-row">
      <button
        className="flex items-center px-2 py-1 h-[60px] text-gray-700 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={searchModal.onOpen}
      >
        <span className="mr-2">Filter</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c6.614 0 12 5.386 12 12-6.614 0-12-5.386-12-12zM4 4v5h16V4zM3 15H21v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default FilterButton;
