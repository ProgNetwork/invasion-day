import SignupForm from '@/components/form/SignupForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

const NavLink: React.FC<{ item: NavItem; onClick?: () => void }> = ({ item, onClick }) => {
  const linkClasses = 'text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium text-md';

  if (item.external) {
    return (
      <a href={item.path} className={linkClasses} target="_blank" rel="noopener noreferrer" onClick={onClick}>
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-200 bg-white" role="navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/images/tft-logo-shape.png" alt="Together for Treaty Logo" width={56} height={56} className="w-14 h-auto" />
              <span className="text-lg ml-1 font-bold text-primary-700">Together for Treaty</span>
            </Link>
          </div>

          <div className="hidden items-center space-x-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          <div className="hidden flex-shrink-0 lg:flex items-center space-x-3">
            <Button variant="outline" size="md" href="/donate">
              Donate
            </Button>
            <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
              Join
            </Button>
          </div>

          <div className="flex items-center lg:hidden">
            <Button variant="outline" size="sm" className="mr-2" href="/donate">
              Donate
            </Button>
            <Button variant="primary" size="sm" className="mr-3" onClick={() => setIsModalOpen(true)}>
              Join
            </Button>
            <button
              onClick={toggleMenu}
              className="hover:text-primary-600 focus:ring-primary-500 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-inset"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>

              <Bars3Icon className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} />
              <XMarkIcon className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} />
            </button>
          </div>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
          <div className="space-y-1 border-t border-gray-200 bg-white px-2 pt-2 pb-3 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="block">
                <NavLink item={item} onClick={closeMenu} />
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="outline" size="md" className="w-full" href="/donate">
                Donate
              </Button>
              <Button variant="primary" size="md" className="w-full" onClick={() => setIsModalOpen(true)}>
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} noPadding>
        <SignupForm />
      </Modal>
    </nav>
  );
};

export default Nav;
