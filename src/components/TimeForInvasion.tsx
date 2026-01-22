import Image from 'next/image';
import React from 'react';

const TimeForInvasion: React.FC = () => {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-gray-100">
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl text-center">Not A Date To Celebrate</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
              <Image src="/images/rally.jpg" alt="" layout="fill" objectFit="cover" />
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-gray-100">
              <p>
                <strong>January 26 marks a day of profound horror in our history.</strong>      <br />
                It commemorates the violent invasion of First Nations lands, the beginning of colonization that brought genocide, cultural destruction, and ongoing injustice. For generations, First Nations peoples have fought for truth-telling and justice on this day.
              </p>
              <p>
                <strong>That's why we rally.</strong>      <br />
                Every year, thousands march for truth and justice - for freedom, land rights, an end to racism, and thriving futures for our young people. This is our stand against the horror of invasion and our collective demand for a better future.
              </p>
              <p>
                <strong>Join the rally. Be part of the movement.</strong>      <br />
                Together, we amplify First Nations voices, demand Treaty now, and fight for a country that honors all people - whether they've been here five years, five generations, or fifty thousand generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeForInvasion;
