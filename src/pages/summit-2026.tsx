import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const Summit2026 = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="min-h-screen py-20 sm:py-28 relative overflow-hidden" style={{ backgroundColor: '#f27419' }}>
        {/* Background Image with Gradient Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-25' : 'opacity-0'}`}>
          <Image
            src="/images/trees.jpg"
            alt="Trees background"
            fill
            className="object-cover"
            priority
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#f27419]/40 via-[#f27419]/30 to-[#f27419]/50"></div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large Circle with Animation */}
          <div className="absolute top-8 right-8 w-40 h-40 border-2 border-white/15 rounded-full hidden lg:block animate-pulse"></div>
          <div className="absolute top-12 right-12 w-32 h-32 border-2 border-white/25 rounded-full hidden lg:block"></div>
          
          {/* Small Dots Grid - Enhanced */}
          <div className="absolute top-16 left-8 hidden lg:grid grid-cols-4 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            ))}
          </div>
          
          {/* Diagonal Lines - More Refined */}
          <div className="absolute bottom-16 left-16 hidden lg:block">
            <div className="w-20 h-0.5 bg-white/25 rotate-45 mb-3"></div>
            <div className="w-20 h-0.5 bg-white/25 rotate-45 mb-3"></div>
            <div className="w-20 h-0.5 bg-white/25 rotate-45"></div>
          </div>
          
          {/* Wavy Lines - Multiple */}
          <div className="absolute top-1/3 right-0 hidden lg:block">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" className="opacity-15">
              <path d="M0 15 Q30 5, 60 15 T120 15" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-0 hidden lg:block">
            <svg width="100" height="25" viewBox="0 0 100 25" fill="none" className="opacity-15">
              <path d="M0 12 Q25 2, 50 12 T100 12" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Geometric Shapes */}
          <div className="absolute top-1/2 left-4 hidden lg:block">
            <div className="w-3 h-3 border-2 border-white/30 rotate-45"></div>
          </div>
          <div className="absolute bottom-24 right-24 hidden lg:block">
            <div className="w-4 h-4 border-2 border-white/20 rotate-45"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="relative">
              {/* Decorative Accent Line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-white/30 rounded-full hidden lg:block"></div>
              
              <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-10 lg:p-12 relative overflow-hidden">
                {/* Subtle Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f27419]/5 rounded-bl-full"></div>
                
                <div className="relative">
                  {/* Year Badge */}
                  <div className="inline-block mb-4">
                    <div className="text-6xl font-extrabold text-[#f27419] leading-none tracking-tight">2026</div>
                    <div className="h-1 w-16 bg-[#f27419] mt-2"></div>
                  </div>
                  
                  <h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight">
                    Together for Treaty<br />Summit
                  </h2>
                  
                  <div className="h-px w-24 bg-gray-300 my-6"></div>
                  
                  <p className="text-lg leading-relaxed text-gray-700 mb-10 font-medium">
                    A two-day summit designed for, both First Nations people and allies - to connect, yarn, learn and plan for action
                  </p>

                  {/* Event Details - Enhanced */}
                  <div className="space-y-5 mb-8">
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#f27419] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#f27419] uppercase tracking-wider mb-2">Where</p>
                        <p className="text-base text-gray-900 leading-relaxed">Naarm / Melbourne (exact location to be shared closer to the date)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#f27419] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#f27419] uppercase tracking-wider mb-2">When</p>
                        <p className="text-base text-gray-900 leading-relaxed">Saturday 21 February - Sunday 22 February 2026<br />(~10am-4pm each day)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#f27419] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#f27419] uppercase tracking-wider mb-2">Who</p>
                        <p className="text-base text-gray-900 leading-relaxed">Both First Nations people and allies from across the continent who are keen to grow the Together for Treaty campaign in your community</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-24 bg-gray-300 my-8"></div>

                  {/* Contact Info */}
                  <div className="mb-8">
                    <p className="text-sm leading-relaxed text-gray-700">
                      If you have any questions, please get in touch with us via{' '}
                      <a 
                        href="mailto:info@commonthreads.org.au" 
                        className="text-[#f27419] hover:text-[#d86515] underline font-semibold transition-colors duration-200"
                      >
                        info@commonthreads.org.au
                      </a>
                      .
                    </p>
                  </div>

                  {/* CTA Button - Enhanced */}
                  <Button
                    variant="primary"
                    size="lg"
                    href="https://docs.google.com/forms/d/1tBXn9joYLCPfwEhP24WmUkcOZI4R7MiH163dwRJoPiU"
                    external
                    className="bg-[#f27419] hover:bg-[#d86515] text-white border-none"
                  >
                    Register Your Interest
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element - Enhanced */}
            <div className="relative hidden lg:block">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 group">
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f27419]/20 via-transparent to-[#f27419]/30 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                
                <Image
                  src="/images/timeline/timeline7.jpg"
                  alt="Summit 2026"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-28 h-28 border-4 border-white/50 rounded-full z-20 shadow-lg"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 border-2 border-white/40 rounded-full z-20"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-br-full z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summit2026;
