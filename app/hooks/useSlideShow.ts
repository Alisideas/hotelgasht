import { create } from 'zustand';

interface SlideShowModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSlideShow = create<SlideShowModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSlideShow;