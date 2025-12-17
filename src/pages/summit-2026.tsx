import React, { useState } from 'react';
import Image from 'next/image';

const Summit2026 = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="min-h-screen py-12 relative overflow-hidden" style={{ backgroundColor: '#f27419' }}>
        {/* Background Image */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-70' : 'opacity-0'}`}>
          <Image
            src="/images/trees.jpg"
            alt="Trees background"
            fill
            className="object-cover"
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-700 sm:text-4xl font-rock-salt"><span className="block">Common Threads <br />Summit 2026</span></h2>
            <br/>
            <p className="text-md mb-8 leading-relaxed text-gray-900 sm:text-2xl font-bold">
              A three-day summit designed for, and by, First Nations people - to connect, yarn, learn and plan for action
            </p>

            <p className="text-2xl font-bold text-orange-600 mb-2">WHERE: <span className="text-gray-900">Naarm / Melbourne (exact location to be shared closer to the date)</span></p>
            <p className="text-2xl font-bold text-orange-600 mb-8">WHEN: <span className="text-gray-900">Saturday 21 February - Sunday 22 February 2026 (~10am-4pm each day)</span></p>
            
            <p className="text-lg text-gray-700 mb-4">
              Who: First Nations people and allies from across the continent who are keen to grow the Together for Treaty campaign in your community
            </p>
            <p className="text-lg text-gray-700 mb-8">
              If you have any questions, please get in touch with us via <a href="mailto:info@commonthreads.org.au" className="text-blue-600 hover:underline">info@commonthreads.org.au</a> (please note any enquiries during the holiday season will be responded to in January).
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1tBXn9joYLCPfwEhP24WmUkcOZI4R7MiH163dwRJoPiU/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out"
            >
              Register Your Interest
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summit2026;

