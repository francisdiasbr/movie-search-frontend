import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import Image from 'next/image';

interface MainImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMainImage: { url: string; filename: string } | null;
}

export default function MainImageModal({ isOpen, onClose, selectedMainImage }: MainImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visualizar Imagem Principal</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} display="flex" justifyContent="center" alignItems="center">
          {selectedMainImage && (
            <Image
              src={selectedMainImage.url}
              alt={selectedMainImage.filename}
              width={800}
              height={600}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                borderRadius: '8px',
                objectFit: 'contain'
              }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
