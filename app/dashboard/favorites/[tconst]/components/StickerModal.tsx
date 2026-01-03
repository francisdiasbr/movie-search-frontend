import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import Image from 'next/image';

interface StickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSticker: { url: string; filename: string } | null;
}

export default function StickerModal({ isOpen, onClose, selectedSticker }: StickerModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visualizar Sticker</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} display="flex" justifyContent="center" alignItems="center">
          {selectedSticker && (
            <Image
              src={selectedSticker.url}
              alt={selectedSticker.filename}
              width={600}
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
