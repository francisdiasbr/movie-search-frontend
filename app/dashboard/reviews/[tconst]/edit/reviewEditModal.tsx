'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface ReviewContent {
  pt?: { text: string };
  en?: { text: string };
}

interface ReviewEditModalProps {
  initialContent: ReviewContent;
  onCancel: () => void;
  onSave: (content: ReviewContent) => Promise<void>;
}

export default function ReviewEditModal({ initialContent, onCancel, onSave }: ReviewEditModalProps) {
  const [content, setContent] = useState<ReviewContent>({
    pt: { text: initialContent.pt?.text || '' },
    en: { text: initialContent.en?.text || '' }
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      pt: { text: content.pt?.text || '' },
      en: { text: content.en?.text || '' }
    });
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={onCancel} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Resenha</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Português:</FormLabel>
              <Textarea
                value={content.pt?.text || ''}
                onChange={(e) => setContent({
                  ...content,
                  pt: { text: e.target.value }
                })}
                rows={6}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>English:</FormLabel>
              <Textarea
                value={content.en?.text || ''}
                onChange={(e) => setContent({
                  ...content,
                  en: { text: e.target.value }
                })}
                rows={6}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
