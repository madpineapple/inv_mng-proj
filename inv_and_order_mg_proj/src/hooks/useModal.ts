import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const useModal = (): ModalProps => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
};

export default useModal;
