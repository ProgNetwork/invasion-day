import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FooterItem {
  label: string;
  path: string;
  external?: boolean;
}

interface FooterColumn {
  label: string;
  items: FooterItem[];
}

interface FooterColumnProps {
  data: FooterColumn;
}

const DONATE_ITEMS: (FooterItem | undefined)[] = [
  {
    label: 'Make a donation',
    path: '/donate',
  },
  // {
  //   label: "Gift in your Will",
  //   path: "/donate/willpower",
  // },
  {
    label: 'Donations Policy',
    path: '/donations-policy',
  },
  // {
  //   label: "Donations Disclosure",
  //   path: "/about/transparency",
  // },
];

const INFO_ITEMS: (FooterItem | undefined)[] = [
  // {
  //   label: "Update your details",
  //   path: "/dashboard",
  // },
  // {
  //   label: "Unsubscribe",
  //   path: "/unsubscribe",
  // },
  {
    label: 'Privacy Policy',
    path: '/privacy-policy',
  },
  // {
  //   label: "Frequently Asked Questions",
  //   path: "/about/faqs",
  // },
  // {
  //   label: "Contact Us",
  //   path: "/contact-us",
  // },
];

const FOOTER_SECTIONS: FooterColumn[] = [
  {
    label: 'Donate',
    items: DONATE_ITEMS.filter(Boolean) as FooterItem[],
  },
  {
    label: 'Info',
    items: INFO_ITEMS.filter(Boolean) as FooterItem[],
  },
];

const FooterLink: React.FC<{ item: FooterItem }> = ({ item }) => {
  const linkClasses
    = 'my-3 block text-gray-300 hover:text-gray-100 transition-colors duration-200 flex gap-1 items-center';

  if (item.external) {
    return (
      <a href={item.path} className={linkClasses} target="_blank" rel="noopener noreferrer">
        {item.label}
        <ArrowTopRightOnSquareIcon className="h-4 w-4 opacity-50" />
      </a>
    );
  }

  return (
    <Link href={item.path} className={linkClasses}>
      {item.label}
    </Link>
  );
};

const FooterColumnComponent: React.FC<FooterColumnProps> = ({ data }) => (
  <div className="mb-8 text-sm sm:text-base md:mb-0 ">
    <h3 className="mb-4 text-xs font-medium tracking-wide text-gray-300 uppercase">{data.label}</h3>
    <nav aria-label={`${data.label} links`}>
      <ul className="space-y-3">
        {data.items.map((item) => (
          <li key={item.path}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black px-4 py-12" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 items-start">
          {FOOTER_SECTIONS.map((section) => (
            <FooterColumnComponent key={section.label} data={section} />
          ))}
        </div>

        <div className="mt-12 space-y-4 text-xs text-gray-300">
          <p>
            We pay respect to our Elders and acknowledge the Traditional Owners who’ve cared for country since time immemorial. Sovereignty was never ceded - it always was, and always will be, Aboriginal land.
          </p>

          <p>
            © 2025 Common Threads All rights reserved. Authorised by L. Baldwin-Roberts, Common Threads.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
