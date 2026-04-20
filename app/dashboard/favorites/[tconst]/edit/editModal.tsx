'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

import { editDetails, fetchDetails } from '../../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';

interface EditModalProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
  tconst: string;
}

interface ReferenceInputProps {
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
}

const ReferenceInput = ({ onChange, onRemove, value }: ReferenceInputProps) => {
  return (
    <HStack spacing={2} mb={2}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite a URL da referência"
      />
      <IconButton
        aria-label="Remover referência"
        icon={<FaTrash />}
        onClick={onRemove}
        colorScheme="red"
        variant="ghost"
      />
    </HStack>
  );
};

export default function EditModal({ data, isOpen, onClose, tconst }: EditModalProps) {
  const [formData, setFormData] = useState(data);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleUpdate = async () => {
    if (!formData) return;

    const updateData = {
      magnet_link: formData.magnet_link || '',
      references: Array.isArray(formData.references)
        ? formData.references.filter((ref: string) => ref.trim() !== '')
        : [],
      soundtrack: formData.soundtrack || '',
      tconst: data.tconst,
      watched: data.watched,
      wiki: formData.wiki || '',
    };

    dispatch(editDetails(updateData)).then((resultAction) => {
      if (editDetails.fulfilled.match(resultAction)) {
        toast({
          title: 'Sucesso',
          description: 'Filme atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        dispatch(fetchDetails(tconst));
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível atualizar o filme.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const handleAddReference = () => {
    setFormData({
      ...formData,
      references: [...(formData.references || []), '']
    });
  };

  const handleReferenceChange = (index: number, value: string) => {
    const newReferences = [...(formData.references || [])];
    newReferences[index] = value;
    setFormData({
      ...formData,
      references: newReferences
    });
  };

  const handleReferenceRemove = (index: number) => {
    const newReferences = [...(formData.references || [])];
    newReferences.splice(index, 1);
    setFormData({
      ...formData,
      references: newReferences
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Favorito</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Trilha Sonora (Spotify URL)</FormLabel>
            <Input
              value={formData?.soundtrack || ''}
              onChange={(e) => setFormData({ ...formData, soundtrack: e.target.value })}
              placeholder="URL da trilha sonora no Spotify"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Wiki</FormLabel>
            <Input
              value={formData?.wiki || ''}
              onChange={(e) => setFormData({ ...formData, wiki: e.target.value })}
              placeholder="URL da página Wiki"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Magnet Link (Torrent)</FormLabel>
            <Input
              value={formData?.magnet_link || ''}
              onChange={(e) => setFormData({ ...formData, magnet_link: e.target.value })}
              placeholder="magnet:?xt=urn:btih:..."
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Referências</FormLabel>
            {(formData?.references || []).map((reference: string, index: number) => (
              <ReferenceInput
                key={index}
                value={reference}
                onChange={(value) => handleReferenceChange(index, value)}
                onRemove={() => handleReferenceRemove(index)}
              />
            ))}
            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              onClick={handleAddReference}
              mt={2}
            >
              Adicionar Referência
            </Button>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
