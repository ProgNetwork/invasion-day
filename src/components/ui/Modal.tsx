import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  noPadding?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, noPadding = false }) => {
  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none p-0" onClose={onClose}>
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className={`fixed inset-0 flex w-screen items-center justify-center p-0`}>
            <DialogPanel
              transition
              className={`w-full max-w-md rounded-xl bg-white/95 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 ${noPadding ? "p-0": "p-6"}`}
            >
              {title &&
                <DialogTitle as="h3" className="text-2xl font-semibold pb-2 text-gray-700 font-rock-salt">
                  {title}
                </DialogTitle>
              }
              <div>
                {children}
              </div>
            </DialogPanel>
        </div>
      </Dialog>

    </>
  );
};

export default Modal;
