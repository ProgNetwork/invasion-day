import React from 'react';
import Link from 'next/link';

const SummitPromo: React.FC = () => {
  return (
    <section className="bg-[#f27419] py-12 text-center text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Join us at the National Summit 2026!</h2>
        <p className="text-lg mb-6">
          Connect, learn, and plan for action with First Nations people and allies.
        </p>
        <Link href="/summit-2026" className="inline-block bg-white text-[#f27419] font-bold py-3 px-6 rounded-lg text-xl hover:bg-gray-100 transition duration-300 ease-in-out">
            Learn More & Register Your Interest
        </Link>
      </div>
    </section>
  );
};

export default SummitPromo;
