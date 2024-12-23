"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import Modal from "./ui/modal";
import NumberField from "./form/number-field";
import useModalStore from "@/store/modal-store";

export default function SettingsModal() {
  const { closeModal } = useModalStore();

  return (
    <Modal>
      <div className="w-[400px] rounded-lg">
        <div className="flex justify-between items-center mb-6 border-b border-b-slate-700 pb-4">
          <p className="text-lg font-medium">Settings</p>
          <button onClick={closeModal}>
            <X size={24} />
          </button>
        </div>

        <p className="font-medium mb-5">Time (minutes)</p>
        <div className="flex justify-between space-x-4 mb-8">
          <NumberField label="Pomodoro" value={25} />
          <NumberField label="Short Break" value={25} />
          <NumberField label="Long Break" value={25} />
        </div>
        <div className="flex justify-between items-center">
          <p>Long Break Interval</p>
          <NumberField isLabel={false} value={25} />
        </div>
        <div className="flex justify-end  mt-6 pt-4">
          <Button label="Okay" styles="bg-black" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
}
