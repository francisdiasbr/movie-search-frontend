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
  Switch,
  Input,
  useToast
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../../../lib/hooks';
import { editDetails, fetchDetails } from '../../../../../lib/features/movie/movieDetailsSlice';
import { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  tconst: string;
}

export default function EditModal({ isOpen, onClose, data, tconst }: EditModalProps) {
  const [formData, setFormData] = useState(data);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleUpdate = async () => {
    if (!formData) return;

    const updateData = {
      ...formData,
      soundtrack: formData.soundtrack || '',
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Favorito</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>IMDB ID (tconst)</FormLabel>
            <Input 
              isReadOnly 
              value={data?.tconst} 
              bg='gray.100' 
              cursor='not-allowed' 
              _hover={{ bg: 'gray.100' }} 
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Título Original</FormLabel>
            <Input 
              isReadOnly 
              value={data?.originalTitle} 
              bg='gray.100' 
              cursor='not-allowed' 
              _hover={{ bg: 'gray.100' }} 
            />
          </FormControl>

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

          <FormControl display='flex' alignItems='center' mb={4}>
            <FormLabel htmlFor='watched' mb='0'>
              Já assistiu?
            </FormLabel>
            <Switch
              id='watched'
              isChecked={formData?.watched || false}
              onChange={() => setFormData({ ...formData, watched: !formData?.watched })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
            Salvar
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
