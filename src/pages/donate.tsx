import DonateForm from '@/components/form/DonateForm';
import Image from 'next/image';

const DonatePage = () => (
  <div className="min-h-screen bg-primary-600 py-12 relative overflow-hidden">
    {/* Background Image - Mobile/Tablet */}
    <div className="absolute inset-0 opacity-70 lg:hidden">
      <Image
        src="/images/artboard-2.png"
        alt="Together for Treaty campaign"
        fill
        className="object-cover"
        priority
      />
    </div>
    
    {/* Background Image - Desktop */}
    <div className="absolute inset-0 opacity-70 hidden lg:block">
      <Image
        src="/images/girl-collage.png"
        alt="Together for Treaty campaign"
        fill
        className="object-cover"
        priority
      />
    </div>
    
    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transparent Block */}
        <div className="hidden lg:block">
          {/* This space is intentionally left transparent */}
        </div>
        
        {/* Donation Form */}
        <div>
          <DonateForm />
        </div>
      </div>
    </div>
  </div>
);

export default DonatePage;
