import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

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
    label: "Make a donation",
    path: "/donate",
  },
  // {
  //   label: "Gift in your Will",
  //   path: "/donate/willpower",
  // },
  {
    label: "Donations Policy",
    path: "/donations-policy",
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
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  // {
  //   label: "Frequently Asked Questions",
  //   path: "/about/faqs",
  // },
  // {
  //   label: "Contact Us",
  //   path: "/contact-us",
  // },
  // {
  //   label: "Work at GetUp",
  //   path: "/about/work-at-getup",
  // },
];

const FOOTER_SECTIONS: FooterColumn[] = [
  {
    label: "Donate",
    items: DONATE_ITEMS.filter(Boolean) as FooterItem[],
  },
  {
    label: "Info",
    items: INFO_ITEMS.filter(Boolean) as FooterItem[],
  },
];

const FooterLink: React.FC<{ item: FooterItem }> = ({ item }) => {
  const linkClasses =
    "my-3 block text-gray-700 hover:text-primary-600 transition-colors duration-200 flex gap-1 items-center";

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

const FooterColumn: React.FC<FooterColumnProps> = ({ data }) => (
  <div className="mb-8 w-1/2 text-sm sm:text-base md:mb-0 md:w-3/12">
    <h3 className="mb-4 text-xs font-medium tracking-wide text-gray-400 uppercase">{data.label}</h3>
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 px-4 py-12" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap">
          <div className="mb-8 w-1/2 text-sm md:mb-0 md:w-3/12">
            <div className="-m-1.5 mb-4 -ml-1.5 w-2/5" style={{ minWidth: "100px", padding: "12px 4px" }}></div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <FooterColumn key={section.label} data={section} />
          ))}
        </div>

        <div className="mt-12 space-y-4 text-xs text-gray-500">
          <p>
            Our team acknowledges that we meet and work on stolen land. We wish to
            pay respect to their Elders — past, present and future — and acknowledge the important role all Aboriginal
            and Torres Strait Islander people continue to play within Australia and the GetUp community.
          </p>

          <p className="w-full">
            WARNING: Aboriginal and Torres Strait Islander people are warned that this website may contain images or
            names of deceased persons.
          </p>

          <p>
            © {currentYear} Common Threads All rights reserved. Authorised by L. Baldwin-Roberts, Common Threads.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;