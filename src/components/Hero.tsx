import SignupForm from "@/components/form/SignupForm";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React, { useState } from "react";

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden md:h-[600]">
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./images/hero.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
          Together for Treaty
        </h1>

        <div className="text-md mb-8 leading-relaxed text-white sm:text-2xl">
          <p className="mb-4">
            Join a movement of First Nations peoples and allies building unstoppable momentum for truth, Treaty and
            justice.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
            Join the Movement
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="w-full border-white text-white hover:bg-white hover:text-gray-900 sm:w-auto"
          >
            Watch the Launch Video
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Join the Movement">
        <SignupForm/>
      </Modal>
    </section>
  );
};

export default Hero;
