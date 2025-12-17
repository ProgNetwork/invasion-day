import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ForumIcon from '@mui/icons-material/Forum';
import EditIcon from '@mui/icons-material/Edit';
import GroupsIcon from '@mui/icons-material/Groups';
import PdfModal from '@/components/PdfModal';
import ImageLightbox from '@/components/ImageLightbox';
import DownloadSignupModal from '@/components/DownloadSignupModal';
import JSZip from 'jszip';
import { hasCookie } from '@/lib/utils';
import { trackDownload } from '@/lib/gtm';

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

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    startIndex: number;
  }>({
    isOpen: false,
    images: [],
    startIndex: 0,
  });

  /* eslint-disable func-call-spacing, indent */
  const [downloadSignupModal, setDownloadSignupModal] = useState<{
    isOpen: boolean;
    downloadAction: (() => void) | null;
  }>({
    isOpen: false,
    downloadAction: null,
  });
  /* eslint-enable func-call-spacing, indent */

  const posterImages = [
    '/posters/1-large.jpg',
    '/posters/2-large.jpg',
    '/posters/3-large.jpg',
    '/posters/4-large.jpg',
  ];

  const posterPdfs = [
    '/posters/Treaty-Poster-1.pdf',
    '/posters/Treaty-Poster-2.pdf',
    '/posters/Treaty-Poster-3.pdf',
    '/posters/Treaty-Poster-4.pdf',
  ];

  const handlePdfClick = (pdfUrl: string, title: string) => {
    // Check if user has signed up
    if (!hasCookie('tft_signup_completed')) {
      setDownloadSignupModal({
        isOpen: true,
        downloadAction: () => {
          // Check if we're on desktop (window width > 768px)
          if (typeof window !== 'undefined' && window.innerWidth > 768) {
            setModalState({ isOpen: true, pdfUrl, title });
          } else {
            // On mobile, open in new tab
            window.open(pdfUrl, '_blank', 'noopener,noreferrer');
          }
        },
      });
      return;
    }

    // Track PDF view/download
    trackDownload(title);

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

  const handlePosterClick = (index: number) => {
    setLightboxState({
      isOpen: true,
      images: posterImages,
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

  const handleDownloadAll = async () => {
    // Check if user has signed up
    if (!hasCookie('tft_signup_completed')) {
      setDownloadSignupModal({
        isOpen: true,
        downloadAction: async () => {
          try {
            const zip = new JSZip();

            // Add each PDF to the zip
            for (let i = 0; i < posterPdfs.length; i++) {
              const response = await fetch(posterPdfs[i]);
              const blob = await response.blob();
              zip.file(`Treaty-Poster-${i + 1}.pdf`, blob);
            }

            // Generate the zip file
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = 'Together-for-Treaty-Poster-Pack.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(link.href);
          } catch {
            // Fallback: download files individually
            posterPdfs.forEach((pdf, index) => {
              const link = document.createElement('a');
              link.href = pdf;
              link.download = `Treaty-Poster-${index + 1}.pdf`;
              link.click();
            });
          }
        },
      });
      return;
    }

    try {
      const zip = new JSZip();

      // Add each PDF to the zip
      for (let i = 0; i < posterPdfs.length; i++) {
        const response = await fetch(posterPdfs[i]);
        const blob = await response.blob();
        zip.file(`Treaty-Poster-${i + 1}.pdf`, blob);
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = 'Together-for-Treaty-Poster-Pack.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(link.href);
    } catch {
      // Fallback: download files individually
      posterPdfs.forEach((pdf, index) => {
        const link = document.createElement('a');
        link.href = pdf;
        link.download = `Treaty-Poster-${index + 1}.pdf`;
        link.click();
      });
    }
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
              backgroundImage: 'url(/images/alice.jpg)',
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
            <div className="bg-primary-700 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Spread the word! Download the Together for Treaty poster pack</h2>
              <p className="text-lg mb-6">
                Download the poster and put up at your local cafes, pubs, school bulletin boards, community centers, and other popular spots!
              </p>

              {/* Poster Thumbnails */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-white rounded-lg p-2 flex justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handlePosterClick(0)}>
                  <Image
                    src="/posters/1-thumb.jpg"
                    alt="Together for Treaty Poster 1"
                    className="w-auto h-auto rounded max-w-[200px]"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="bg-white rounded-lg p-2 flex justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handlePosterClick(1)}>
                  <Image
                    src="/posters/2-thumb.jpg"
                    alt="Together for Treaty Poster 2"
                    className="w-auto h-auto rounded max-w-[200px]"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="bg-white rounded-lg p-2 flex justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handlePosterClick(2)}>
                  <Image
                    src="/posters/3-thumb.jpg"
                    alt="Together for Treaty Poster 3"
                    className="w-auto h-auto rounded max-w-[200px]"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="bg-white rounded-lg p-2 flex justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handlePosterClick(3)}>
                  <Image
                    src="/posters/4-thumb.jpg"
                    alt="Together for Treaty Poster 4"
                    className="w-auto h-auto rounded max-w-[200px]"
                    width={200}
                    height={200}
                  />
                </div>
              </div>

              <Button variant="white" size="lg" onClick={handleDownloadAll}>
                Download All Here
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
                  onClick={() => handlePdfClick('/documents/together_for_treaty_conversation_guide_faq.pdf', 'Conversations Guide')}
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
                  onClick={() => handlePdfClick('/documents/together_for_treaty_kitchen_table_conversation_guide.pdf', 'Kitchen Table Conversation Guide')}
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
                  onClick={() => handlePdfClick('/documents/together_for_treaty_letter_to_editor_guide.pdf', 'How to: Letters to the Editor')}
                >
                  Read more
                </Button>
              </div>

              {/* Taking Action for Treaty | Supporter Guide */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 flex items-center justify-center rounded-md bg-primary-100 text-primary-700 mr-4">
                    <GroupsIcon fontSize="large" className="!text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Taking Action for Treaty | Supporter Guide</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  This guide provides a comprehensive overview of actions you can take to support truth-telling and Treaty, including social media advocacy, community conversations, and engagement with political representatives. It highlights the significance of the Victorian Treaty process and offers valuable resources for individuals and groups to build momentum for First Nations justice.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handlePdfClick('/documents/together_for_treaty_action_guide.pdf', 'Taking Action for Treaty | Supporter Guide')}
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

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        images={lightboxState.images}
        initialIndex={lightboxState.startIndex}
        downloadUrls={posterPdfs}
        onDownloadRequest={(url, filename) => {
          // Check if user has signed up
          if (!hasCookie('tft_signup_completed')) {
            // Close the lightbox first
            closeLightbox();
            // Then open the signup modal
            setDownloadSignupModal({
              isOpen: true,
              downloadAction: () => {
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                link.click();
              },
            });
            return;
          }

          // User has signed up, proceed with download
          trackDownload(filename);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
        }}
      />

      {/* Download Signup Modal */}
      <DownloadSignupModal
        isOpen={downloadSignupModal.isOpen}
        onClose={() => setDownloadSignupModal({ isOpen: false, downloadAction: null })}
        onDownload={() => {
          setDownloadSignupModal({ isOpen: false, downloadAction: null });
          // Re-trigger the download action after successful signup
          if (downloadSignupModal.downloadAction) {
            downloadSignupModal.downloadAction();
          }
        }}
      />
    </main>
  );
};

export default ResourcesPage;
