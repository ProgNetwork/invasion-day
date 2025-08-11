import React from 'react';
import Modal from '@/components/ui/Modal';
import EmailSignupForm from '@/components/form/EmailSignupForm';

interface DownloadSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const DownloadSignupModal: React.FC<DownloadSignupModalProps> = ({
  isOpen,
  onClose,
  onDownload,
}) => {
  const handleSuccess = () => {
    onClose();
    onDownload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <EmailSignupForm onSuccess={handleSuccess} onClose={onClose} />
    </Modal>
  );
};

export default DownloadSignupModal;
