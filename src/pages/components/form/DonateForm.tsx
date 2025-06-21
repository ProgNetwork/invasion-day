import React from "react";
import Button from "../ui/Button";

const DonateForm: React.FC = () => {
  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div className="w-full text-center sm:text-left">
          <div className="">
            <p className="text-sm text-gray-500">
            Donate form goes here
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button variant="primary" className="w-full sm:w-auto">
          Donate
        </Button>
      </div>
    </div>
  );
};

export default DonateForm;