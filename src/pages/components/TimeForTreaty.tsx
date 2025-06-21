import Image from "next/image";
import React from "react";

const TimeForTreaty: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="text-gray-800">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">It's Time for Treaty</h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                First Nations peoples have been fighting for truth-telling and Treaty for generations.
                <span className="font-semibold">
                  Together, we can build unstoppable momentum for Treaties across the country this decade.
                </span>
              </p>
              <p>
                Treaty is about putting First Nations people in the driver's seat, so together we can make the decisions
                that affect our communities, our culture and our Country. Treaty processes create a pathway to
                acknowledge past and present injustices, resolve differences, and work out how to create a shared
                future.
              </p>
              <p>
                This our opportunity to move forward towards unity and a fairer future for everybody. There is a role
                for everyone, sparking conversations and building support for Treaty in your community.
              </p>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
            <Image src="/images/always-was.jpg" alt="" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeForTreaty;
