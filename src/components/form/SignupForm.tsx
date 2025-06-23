import Button from "@/components/ui/Button";
//import { Checkbox } from "@/components/ui/Checkbox";
//import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    postcode: "",
    volunteer: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setFormData((prev) => ({ ...prev, volunteer: !!checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for signing up!");
  };

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div className="w-full text-center sm:text-left">
          <div className="">
            <p className="text-md text-gray-500">
              Sign up to receive updates and find out how you can be part of the movement for Treaty.
            </p>
          </div>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                Postcode
              </Label>
              <Input
                type="text"
                name="postcode"
                id="postcode"
                className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="2000"
                value={formData.postcode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center">
              <Checkbox
                name="volunteer"
                id="volunteer"
                className="focus:ring-primary-500 h-4 w-4 rounded border-gray-300 text-primary-600"
                checked={formData.volunteer}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="volunteer" className="ml-2 block text-sm text-gray-700">
                I'm interested in volunteering with the campaign
              </Label>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
