import Image from "next/image";
import React from "react";

const TimeForTreaty: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-gray-800">
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl font-rock-salt text-center">It's Time for Treaty</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
            <Image src="/images/always-was.jpg" alt="" layout="fill" objectFit="cover" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              <strong>First Nations peoples have been fighting for truth-telling and Treaties for generations.</strong> And right now, after decades of leadership and resistance, we are closer than ever to the first Treaty with First Nations people on this continent.
            </p> 
            <p>
              Together, we can build unstoppable momentum for truth, Treaty and justice. <strong>This is our opportunity to move forward to a more just, fair and united future for everybody who calls these lands home.</strong>
            </p>
            <p>
              <strong>It's going to take all of us:</strong> building support in our neighbourhoods and workplaces, amplifying the voices of First Nations people, and making sure our politicians act on the aspirations of our communities.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default TimeForTreaty;
