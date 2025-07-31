import Image from 'next/image';
import React from 'react';

const OurVision: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/shapes-texture.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-2 xl:grid-cols-3 xl:gap-8 items-center">
          <div className="xl:col-span-2">
            <h2 className="text-primary-700 mb-6 text-3xl font-bold tracking-tight sm:text-4xl">What's at Stake</h2>
            <div className="space-y-6 text-xl leading-relaxed text-gray-700">
              <p>
                Decades of leadership by our Elders have laid the foundations for the historic truth and Treaty process underway in Victoria right now: the first in the country.
              </p>
              <p>
                As we get closer than ever to making Treaties a reality, racist right-wing groups and conservative politicians are pushing divisive campaigns attacking Treaty processes and First Nations rights. In the wake of the Voice referendum result, some states have ripped up their promises on truth and Treaty. But our mob will never back down in demanding truth, Treaty and justice - and there's a role for everyone to stand up in solidarity.
              </p>
              <p>
                By building a powerful movement, we can turn the tide and make sure governments across the continent get back on track with Treaty.
              </p>
            </div>
          </div>

          <div className="mt-8 xl:mt-0">
            <aside className="bg-primary-700 border-secondary-400 rounded-4xl p-8">
              <blockquote className="relative flex flex-col text-md text-gray-800">
                <span className="text-secondary-200 h-12 font-serif text-8xl leading-none">“</span>
                <p className="text-secondary-100 mb-4">
                  <strong>
                    If people from all walks of life stand together with proud support for truth and Treaty, Victoria can lead the way for the whole country to follow.
                  </strong>
                  But if the community goes quiet, First Nations people will be left on the front lines of attacks from racist far-right groups, who are pushing divisive campaigns to wind back our rights.
                </p>
                <p className="text-secondary-100">
                  <strong>That's why it's so important we talk with our friends, neighbours and politicians about why we support building a brighter future through Treaty.</strong>
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center">
                <div className="relative mr-4 h-20 w-20 overflow-hidden rounded-full shadow-inner">
                  <Image
                    src="/images/riss.jpg"
                    alt={'Portrait of Larissa Baldwin-Roberts'}
                    layout="fill"
                    objectFit="cover"
                    className="bg-black"
                  />
                </div>
                <div>
                  <div className="text-secondary-200 font-semibold">Larissa Baldwin-Roberts</div>
                  <div className="text-secondary-600">Campaign Director</div>
                </div>
              </figcaption>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
