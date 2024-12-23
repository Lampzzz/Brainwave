"use client";

import ReactModal from "react-modal";
import useModalStore from "@/store/modal-store";

interface ModalProps {
  children: React.ReactNode;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1c1c1e",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function Modal({ children }: ModalProps) {
  const { isOpen } = useModalStore();

  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      {children}
    </ReactModal>
  );
}
