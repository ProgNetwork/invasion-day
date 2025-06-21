import React from "react";
import Button from "./ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[420px] md:h-[600] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./images/hero.png')"
          }}
        />
        <div className="absolute inset-0 bg-black/50 "></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Together for Treaty
        </h1>
        
        <div className="text-md sm:text-2xl text-white mb-8 leading-relaxed">
          <p className="mb-4">
          Join a movement of First Nations peoples and allies building unstoppable momentum for truth, Treaty and justice.
          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="primary" 
            size="md"
            className="w-full sm:w-auto"
          >
            Join the Movement
          </Button>
          <Button 
            variant="secondary" 
            size="md"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900"
          >
            Watch the Launch Video
          </Button>
        </div>
      </div>

      
    </section>
  );
};

export default Hero; 