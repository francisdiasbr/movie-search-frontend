import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

interface LoadingModalProps {
  isOpen: boolean;
}

export default function LoadingModal({ isOpen }: LoadingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody py={8}>
          <VStack spacing={4}>
            <Spinner size="xl" color="purple.500" thickness="4px" />
            <Text fontSize="lg" fontWeight="medium">
              A resenha está sendo criada...
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
} 