import { useEffect, useRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: Function;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const clicklistener = (e: MouseEvent) => {
        if (e.target === container) {
          onClose();
        }
      };

      container.addEventListener('click', clicklistener);

      // return container.removeEventListener('click', clicklistener);
    }

    return () => {};
  }, [isOpen]);

  if (!isOpen) {
    return <div />;
  }

  return (
    <div
      className="fixed z-[100] inset-0 w-screen h-screen bg-gray-800/40 flex items-center justify-center p-4 lg:p-8"
      ref={containerRef}
    >
      <div className="bg-white w-[90%] md:w-[80%] max-h-[90%] overflow-scroll">{children}</div>
    </div>
  );
}
