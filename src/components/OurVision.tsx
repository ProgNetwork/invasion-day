import Image from "next/image";
import React from "react";

const OurVision: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-2 xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-2">
            <h2 className="text-primary-700 mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Our Vision</h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                We want a country that values all people, whether they have been here five years, five generations or
                five thousand generations. But too often, First Nations people have been ignored when we discuss who we
                are and what sort of country we want to be. Treaties provide a way to acknowledge past and present
                injustices, resolve differences, and work out how to create a shared future.
              </p>
              <p>
                Treaty is about putting First Nations people in the driver's seat so together we can make the decisions
                that affect our communities, our culture and our Country. We know our communities best - so when we have
                a say over policies that impact us, they work better for us.
              </p>
            </div>
          </div>

          <div className="mt-8 xl:mt-0">
            <aside className="bg-primary-700 border-secondary-400 rounded-4xl p-8">
              <blockquote className="relative flex flex-col text-xl text-gray-800">
                <span className="text-secondary-200 h-12 font-serif text-8xl leading-none">“</span>
                <p className="text-secondary-100">
                  Treaty is not just about the past—it's about creating a better future for all of us. It's about
                  establishing a relationship based on truth, justice, and mutual respect. The momentum we're seeing now
                  across the country shows that Australians are ready for this conversation and ready for change.
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center">
                <div className="relative mr-4 h-14 w-14 overflow-hidden rounded-full shadow-inner">
                  <Image
                    src="/images/larissa.png"
                    alt={`Portrait of Larissa Baldwin-Roberts`}
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
