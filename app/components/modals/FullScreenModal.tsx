import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const FullScreenModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
            justify-center 
            items-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
            bg-neutral-800/70
          "
      >
        <div
          className="
            relative 
            w-full
            mx-auto 
            h-full 
            md:h-auto
            my-6 
            lg:h-auto
            "
        >
          {/*content*/}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModal ? "translate-y-0" : "translate-y-full"}
              ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0 
                rounded-lg 
                shadow-lg 
                relative 
                flex 
                flex-col 
                w-full 
                bg-white 
                outline-none 
                focus:outline-none
              "
            >
              {/*header*/}
              <div
                className="
                  flex 
                  items-center 
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                  "
              ></div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <button
                  className="
                  z-50
                      p-1
                      border-0 
                      hover:opacity-70
                      transition
                      absolute
                      left-9
                    "
                  onClick={handleClose}
                >
                  <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full flex items-center justify-center hover:bg-neutral-300 bg-neutral-200">
                    <IoMdClose size={18} color="red" />
                  </div>
                </button>
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullScreenModal;
