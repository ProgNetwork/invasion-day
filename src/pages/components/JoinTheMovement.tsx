import React, { useState } from "react";
import SignupForm from "./SignupForm";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

const JoinTheMovement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="bg-secondary-100">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Join the Movement</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-700">
            The time for Treaty is now. Together, we can build a national movement of First Nations people and allies
            standing side-by-side for truth-telling, Treaties and justice.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={openModal}>
              Join the Movement
            </Button>
            <Button variant="outline" size="lg" onClick={openModal}>
              Donate
            </Button>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Join the Movement">
        <SignupForm />
      </Modal>
    </>
  );
};

export default JoinTheMovement;
