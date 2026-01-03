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
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useState } from 'react';

import { BlogPostEntry } from '../../../../../lib/features/blogPosts/blogPostsSlice';

interface BlogPostEditModalProps {
  initialData: BlogPostEntry;
  onSave: (data: BlogPostEntry) => Promise<void>;
  onCancel: () => void;
}

export default function BlogPostEditModal({ initialData, onSave, onCancel }: BlogPostEditModalProps) {
  const [data, setData] = useState<BlogPostEntry>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = (lang: 'pt' | 'en', field: string, value: string) => {
    setData({
      ...data,
      content: {
        ...data.content,
        [lang]: {
          ...data.content[lang],
          [field]: value,
        },
      },
    });
  };

  return (
    <Modal isOpen={true} onClose={onCancel} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Resenha Gerada com IA</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Tabs>
              <TabList>
                <Tab>Português</Tab>
                <Tab>English</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Título</FormLabel>
                      <Textarea
                        value={data.content.pt.title}
                        onChange={(e) => updateContent('pt', 'title', e.target.value)}
                        rows={2}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Introdução</FormLabel>
                      <Textarea
                        value={data.content.pt.introduction}
                        onChange={(e) => updateContent('pt', 'introduction', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Resumo do Filme</FormLabel>
                      <Textarea
                        value={data.content.pt.plot_summary}
                        onChange={(e) => updateContent('pt', 'plot_summary', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Análise de Atuação</FormLabel>
                      <Textarea
                        value={data.content.pt.acting_analysis}
                        onChange={(e) => updateContent('pt', 'acting_analysis', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Impressões Pessoais</FormLabel>
                      <Textarea
                        value={data.content.pt.personal_impressions}
                        onChange={(e) => updateContent('pt', 'personal_impressions', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Recomendação</FormLabel>
                      <Textarea
                        value={data.content.pt.recommendation}
                        onChange={(e) => updateContent('pt', 'recommendation', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Análise Técnica</FormLabel>
                      <Textarea
                        value={data.content.pt.technical_analysis}
                        onChange={(e) => updateContent('pt', 'technical_analysis', e.target.value)}
                        rows={4}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Textarea
                        value={data.content.en.title}
                        onChange={(e) => updateContent('en', 'title', e.target.value)}
                        rows={2}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Introduction</FormLabel>
                      <Textarea
                        value={data.content.en.introduction}
                        onChange={(e) => updateContent('en', 'introduction', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Plot Summary</FormLabel>
                      <Textarea
                        value={data.content.en.plot_summary}
                        onChange={(e) => updateContent('en', 'plot_summary', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Acting Analysis</FormLabel>
                      <Textarea
                        value={data.content.en.acting_analysis}
                        onChange={(e) => updateContent('en', 'acting_analysis', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Personal Impressions</FormLabel>
                      <Textarea
                        value={data.content.en.personal_impressions}
                        onChange={(e) => updateContent('en', 'personal_impressions', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Recommendation</FormLabel>
                      <Textarea
                        value={data.content.en.recommendation}
                        onChange={(e) => updateContent('en', 'recommendation', e.target.value)}
                        rows={4}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Technical Analysis</FormLabel>
                      <Textarea
                        value={data.content.en.technical_analysis}
                        onChange={(e) => updateContent('en', 'technical_analysis', e.target.value)}
                        rows={4}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

