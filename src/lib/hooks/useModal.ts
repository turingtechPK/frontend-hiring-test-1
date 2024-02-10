import { useState } from 'react';

/**
 * `useModal` hook manages modal state and details.
 * @param title - The title of the modal.
 * @returns A tuple with openModal function and modalDetails object.
 */
export function useModal(title: string): readonly [openModal: () => void, modalDetails: ModalDetails] {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalDetails = {
    isOpen,
    closeModal,
    title,
  };

  return [openModal, modalDetails] as const;
}
