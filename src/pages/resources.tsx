import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ForumIcon from '@mui/icons-material/Forum';
import EditIcon from '@mui/icons-material/Edit';
import GroupsIcon from '@mui/icons-material/Groups';
import PdfModal from '@/components/PdfModal';

const ResourcesPage: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
  }>({
    isOpen: false,
    pdfUrl: '',
    title: '',
  });

  const handlePdfClick = (pdfUrl: string, title: string) => {
    // Check if we're on desktop (window width > 768px)
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setModalState({ isOpen: true, pdfUrl, title });
    } else {
      // On mobile, open in new tab
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, pdfUrl: '', title: '' });
  };

  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>Community Resources - Together for Treaty</title>
        <meta name="description" content="Community resources for the Together for Treaty campaign" />
      </Head>

      {/* Page Header Section */}
      <section className="bg-white relative py-16 sm:py-24 border-b-8 border-primary-700">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/resources-hero.jpeg)',
            }}
          />
          <div className="absolute inset-0 bg-zinc-900/90"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">Community Resources</h1>
            <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">
              <p>
                Find guides, resources and all the information you need to build momentum for truth-telling and Treaty in your local area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
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
          <div className="space-y-12">

            {/* Poster Pack Section */}
            <div className="bg-primary-700 rounded-lg p-8 text-white relative">
              {/* Coming Soon Ribbon */}
              <div className="absolute -top-2 -right-2 bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                Coming Soon
              </div>
              <h2 className="text-2xl font-bold mb-4">Spread the word! Download the Together for Treaty poster pack</h2>
              <p className="text-lg mb-6">
                Download the poster and put up at your local cafes, pubs, school bulletin boards, community centers, and other popular spots!
              </p>
              <Button variant="white" size="lg" disabled>
                Download here!
              </Button>
            </div>

            {/* Resources Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* Conversations Guide */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 flex items-center justify-center rounded-md bg-primary-100 text-primary-700 mr-4">
                    <ForumIcon fontSize="large" className="!text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Conversations Guide</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  One-on-one conversations are a powerful way to build support for Treaty, truth-telling, and First Nations justice. Learn about how to make the most of these conversations.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handlePdfClick('/documents/Together for Treaty - Conversation Guide + FAQ.pdf', 'Conversations Guide')}
                >
                  Read more
                </Button>
              </div>

              {/* Kitchen Table Conversation Guide */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 flex items-center justify-center rounded-md bg-primary-100 text-primary-700 mr-4">
                    <GroupsIcon fontSize="large" className="!text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Kitchen Table Conversation Guide</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  A kitchen table conversation brings small groups of people together — often friends, neighbours, co-workers or family — to have respectful, values-based conversations about the issues that matter to us all.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handlePdfClick('/documents/Together for Treaty - Kitchen Table Conversation Guide.pdf', 'Kitchen Table Conversation Guide')}
                >
                  Read more
                </Button>
              </div>

              {/* Letters to the Editor */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 flex items-center justify-center rounded-md bg-primary-100 text-primary-700 mr-4">
                    <EditIcon fontSize="large" className="!text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">How to: Letters to the Editor</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  One way we can tip the scales is ensuring grassroots support for Treaty features proudly in our local newspapers and digital media by writing Letters to the Editor. Get tips, tricks and insight into how to get published.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handlePdfClick('/documents/Together for Treaty - Letter to the Editor Guide.pdf', 'How to: Letters to the Editor')}
                >
                  Read more
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      <PdfModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        pdfUrl={modalState.pdfUrl}
        title={modalState.title}
      />
    </main>
  );
};

export default ResourcesPage;
