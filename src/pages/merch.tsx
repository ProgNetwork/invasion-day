import Head from 'next/head';
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Image from 'next/image';
import Footer from '../components/common/Footer';
import ImageLightbox from '../components/ImageLightbox';
import AllyFriendlyBadge from '../components/common/AllyFriendlyBadge';

const productImages = [
  "/images/merch/together-for-treaty-pin-3.jpg",
  "/images/merch/together-for-treaty-pin-1.jpg",
  "/images/merch/together-for-treaty-pin-2.jpg",
];

const MerchPage: React.FC = () => {
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    startIndex: number;
  }>({
    isOpen: false,
    images: [],
    startIndex: 0,
  });

  const handleImageClick = (index: number) => {
    setLightboxState({
      isOpen: true,
      images: productImages,
      startIndex: index,
    });
  };

  const closeLightbox = () => {
    setLightboxState({
      isOpen: false,
      images: [],
      startIndex: 0,
    });
  };

  return (
    <>
      <Head>
        <title>Together For Treaty Pin - Merchandise</title>
        <meta name="description" content="Join a national movement of First Nations peoples and allies building unstoppable momentum for truth, Treaty and justice with the Together For Treaty Pin." />
      </Head>

      <PageHeader
        title="Merchandise"
        subtitle="Support Together for Treaty and spread the message!"
        image="/images/shoreline.jpg"
      >
        <p>
          Discover our range of merchandise and show your support for the Together
          for Treaty movement. Every purchase helps us continue our vital work.
        </p>
      </PageHeader>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Section */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div
              className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-4 cursor-pointer"
              onClick={() => handleImageClick(productImages.indexOf(activeImage))}
            >
              <Image
                src={activeImage}
                alt="Together For Treaty Pin"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === image ? 'border-primary-700' : 'border-transparent'}`}
                  onClick={() => {
                    setActiveImage(image);
                    handleImageClick(index);
                  }}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Together For Treaty Pin</h1>
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-2xl text-red-600 font-semibold">$15.00</p>
              <AllyFriendlyBadge />
            </div>

            <p className="text-lg text-gray-700 mb-6">
              Join a national movement of First Nations peoples and allies building unstoppable momentum for truth, Treaty and justice.
              Profits from this pin are donated to the Together For Treaty campaign.
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Artwork by Coree Thorpe (Yorta Yorta, Gunditjmara, Gunnai and Wurundjeri).
            </p>

            {/* Quantity and Add to Cart (Placeholder) */}
            <div className="flex items-center space-x-4 mb-8">
              {/* <label htmlFor="quantity" className="text-lg font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-20 p-2 border border-gray-300 rounded-md text-center"
              /> */}
              <a
                href="https://www.clothingthegaps.com.au/collections/just-arrived/products/together-for-treaty-pin?utm_source=togetherfortreaty&utm_medium=merch-page&utm_campaign=pin-merchandise"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors duration-200"
              >
                Shop Online At Clothing The Gaps
              </a>
            </div>

            {/* Product Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Details</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Dimensions 3cm x 2cm.</li>
                <li>Gold metal with enamel fill</li>
                <li>Rubber clasp</li>
                <li>You'll receive me attached to a cute card that explains what I'm about and my purpose</li>
              </ul>
            </div>

            {/* Can I use this? */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Can I use this?</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">This product is Ally Friendly.</h3>
              <p className="text-gray-700 mb-4">
                Ally friendly merch is for everyone. When we see non-Indigenous people wearing our designs,
                we feel proud that they are repping our merch and culture.
              </p>
              <p className="text-gray-700 mb-4">
                When we see Aboriginal designs in the world, it means Indigenous people are not invisible in the landscape.
              </p>
              <p className="text-gray-700 mb-4">
                But, purchasing from Aboriginal brands, businesses and wearing Indigenous designs alone is surface-level allyship.
                There needs to be more commitment than just buying from Aboriginal brands and businesses.
              </p>
              <p className="text-gray-700 mb-4">
                Wearing Aboriginal design is not dismantling a system that oppresses Indigenous people. Allies need to do more and learn more.
                Wearing our tees is a great starting point. We have equipped you with our merch and some of the educational content to go with them.
                We want you to go out in the world, have these important conversations and find ways to do more and support more.
              </p>
              <a href="https://www.clothingthegaps.com.au/blogs/blog/ally-friendly-merch-guide" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline font-medium">Learn more.</a>
            </div>

          </div>
        </div>

        {/* Coming Soon Section */}
        <section className="text-center mt-16 bg-black p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-white">More Merch Coming Soon!</h2>
          <p className="text-lg mb-8 text-gray-200">
            We're constantly working on new items to help you show your
            support. Check back soon for exciting additions!
          </p>
        </section>
      </main>

      <ImageLightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        images={lightboxState.images}
        initialIndex={lightboxState.startIndex}
      />
    </>
  );
};

export default MerchPage;
