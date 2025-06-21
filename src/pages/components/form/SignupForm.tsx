import React from "react";
import Button from "../ui/Button";

const SignupForm: React.FC = () => {
  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div className="w-full text-center sm:text-left">
          <div className="">
            <p className="text-sm text-gray-500">
              Sign up to receive updates and find out how you can be part of the movement for Treaty.
            </p>
          </div>
          <form className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                Postcode
              </label>
              <input
                type="text"
                name="postcode"
                id="postcode"
                className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="3000"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="volunteer"
                id="volunteer"
                className="focus:ring-primary-500 h-4 w-4 rounded border-gray-300 text-primary-600"
              />
              <label htmlFor="volunteer" className="ml-2 block text-sm text-gray-700">
                I'm interested in volunteering with the campaign
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button variant="primary" className="w-full sm:w-auto">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
