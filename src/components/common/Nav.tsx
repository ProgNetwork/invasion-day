import SignupForm from '@/components/form/SignupForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [];

const NavLink: React.FC<{ item: NavItem; onClick?: () => void }> = ({ item, onClick }) => {
  const linkClasses = 'text-gray-100 transition-colors duration-200 font-medium text-md';

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

  const scrollToDonate = () => {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div>
        <nav role="navigation">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              <div className="flex-shrink-0">
                {/* Logo and title removed as requested */}
              </div>
              <div className="hidden items-center space-x-8 lg:flex">
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.path} item={item} />
                ))}
              </div>
              <div className="hidden flex-shrink-0 lg:flex items-center space-x-3">
                <Button variant="outline" size="md" onClick={scrollToDonate}>
                  Donate
                </Button>
                <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
                  Join
                </Button>
              </div>
              <div className="flex items-center lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="focus:ring-primary-500 inline-flex items-center justify-center rounded-md p-2 text-gray-100 focus:ring-2 focus:outline-none focus:ring-inset"
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
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {NAV_ITEMS.map((item) => (
                  <div key={item.path} className="block">
                    <NavLink item={item} onClick={closeMenu} />
                  </div>
                ))}
                <div className="pt-4 space-y-3">
                  <Button variant="outline" size="md" onClick={scrollToDonate} className="w-full">
                    Donate
                  </Button>
                  <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} className="w-full">
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="" noPadding>
          <SignupForm />
        </Modal>
      </div>
    </>
  );
};

export default Nav;
