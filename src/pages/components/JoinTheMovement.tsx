import React from "react";
import Button from "./ui/Button";

const JoinTheMovement: React.FC = () => (
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
        <Button variant="primary" size="lg">
          Join the Movement
        </Button>
        <Button variant="outline" size="lg">
          Donate
        </Button>
      </div>
    </div>
  </section>
);

export default JoinTheMovement;
