import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Campaigns",
    path: "/campaigns",
  },
  {
    label: "Get Involved",
    path: "/get-involved",
  },
  {
    label: "News",
    path: "/news",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const NavLink: React.FC<{ item: NavItem; onClick?: () => void }> = ({ item, onClick }) => {
  const linkClasses = "text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-md";
  
  if (item.external) {
    return (
      <a 
        href={item.path} 
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }
  
  return (
    <Link href={item.path} className={linkClasses} onClick={onClick}>
      {item.label}
    </Link>
  );
};

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200" role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-md font-bold text-gray-900">Together for Treaty</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          <div className="hidden lg:flex flex-shrink-0">
            <Button variant="primary" size="md">
              Join the Movement!
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <Button variant="primary" size="sm" className="mr-3">
              Join the Movement!
            </Button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>

              <Bars3Icon className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}/>
              <XMarkIcon className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}/>

            </button>
          </div>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="block">
                <NavLink item={item} onClick={closeMenu} />
              </div>
            ))}
            <div className="pt-4">
              <Button variant="primary" size="md" className="w-full">
                Join the movement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 