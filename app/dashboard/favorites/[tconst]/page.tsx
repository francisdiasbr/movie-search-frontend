'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import MediaCard from '../../../../app/ui/Cards/MediaCard';
import { fetchAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';
import { fetchBlogPost, createBlogPost } from '../../../../lib/features/blogPosts/blogPostsSlice';
import { generateSticker, fetchAllStickers, deleteSticker } from '../../../../lib/features/generateSticker/generateStickerSlice';
import { postKeyword, getKeywords, deleteKeyword } from '../../../../lib/features/keywords/keywordsSlice';
import { fetchDetails, resetState } from '../../../../lib/features/movie/movieDetailsSlice';
import { fetchMainImage, uploadMainImage, deleteMainImage } from '../../../../lib/features/uploadImages/uploadMainImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { useToastNotifications } from '../../../hooks/useToastNotifications';
import GoBack from '../../../ui/GoBack';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import KeywordsCard from './components/KeywordsCard';
import LinksCard from './components/LinksCard';
import MainImageModal from './components/MainImageModal';
import MainImageUpload from './components/MainImageUpload';
import MovieInfoCard from './components/MovieInfoCard';
import QuotesCard from './components/QuotesCard';
import ReviewButtons from './components/ReviewButtons';
import StickerModal from './components/StickerModal';
import StickerSection from './components/StickerSection';
import TriviaCard from './components/TriviaCard';
import EditModal from './edit/editModal';
import * as S from './styles';

export default function MovieDetailsPage() {
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGeneratingBlogPost, setIsGeneratingBlogPost] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<{url: string, filename: string} | null>(null);
  const [isMainImageModalOpen, setIsMainImageModalOpen] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<{url: string, filename: string} | null>(null);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };
  const router = useRouter();

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  const { showSuccess, showError, showWarning, showInfo } = useToastNotifications();
  const { images, status: uploadMainStatus } = useAppSelector((state) => state.uploadMainImages);
  const { status: stickerStatus, stickers } = useAppSelector((state) => state.generateSticker);

  useEffect(() => {
    if (tconst) {
      if (!data || data.tconst !== tconst) {
        dispatch(fetchDetails(tconst));
      }
    }
    if (existingKeywords.length === 0) {
      dispatch(getKeywords()).then((action) => {
        if (getKeywords.fulfilled.match(action)) {
          setExistingKeywords(action.payload.map((kw: any) => kw.keyword));
        }
      });
    }
  }, [dispatch, tconst, data]);

  // Cleanup: limpa o estado apenas ao desmontar o componente
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      setExistingKeywords([]);
    };
  }, []);

  useEffect(() => {
    if (tconst) {
      dispatch(fetchMainImage({ tconst }));
      dispatch(fetchAllStickers(tconst));
    }
  }, [dispatch, tconst]);

  if (!data) {
    if (fetchStatus === 'loading') {
      return <LoadingSpinner />;
    }
    return <div>No data found.</div>;
  }

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];

  const handleKeywordClick = async (keyword: string) => {
    const resultAction = await dispatch(postKeyword(keyword));

    if (postKeyword.fulfilled.match(resultAction)) {
      setExistingKeywords((prev) => [...prev, keyword]);

      showSuccess({
        title: 'Palavra-chave adicionada.',
      });
    } else {
      // Verifica se é erro 409 (CONFLICT) - pode ser keyword já existe ou outro conflito
      const isConflict = resultAction.payload && 
        typeof resultAction.payload === 'string' && 
        resultAction.payload.includes('409');
      
      if (isConflict) {
        // Para 409, verifica se a keyword já está na lista local
        if (existingKeywords.includes(keyword)) {
          showInfo({
            title: 'Palavra-chave já existe.',
            duration: 2000,
          });
        } else {
          // Se não está na lista local mas deu 409, pode ser validação do backend
          showWarning({
            title: 'Palavra-chave não permitida.',
          });
        }
      } else {
        showError({
          title: 'Erro ao adicionar palavra-chave.',
        });
      }
    }
  };

  const handleKeywordDelete = async (keyword: string) => {
    const resultAction = await dispatch(deleteKeyword(keyword));

    if (deleteKeyword.fulfilled.match(resultAction)) {
      setExistingKeywords((prev) => prev.filter((k) => k !== keyword));
      showSuccess({
        title: 'Palavra-chave removida.',
      });
    } else {
      showError({
        title: 'Erro ao remover palavra-chave.',
      });
    }
  };

  const checkReviewType = async (tconst: string) => {
    try {
      // Verifica se existe uma resenha autoral
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        router.push(`/dashboard/reviews/${tconst}`);
        return;
      }

      const blogAction = await dispatch(fetchBlogPost(tconst));
      if (fetchBlogPost.fulfilled.match(blogAction) && blogAction.payload) {
        router.push(`/dashboard/blogposts/${tconst}`);
        return;
      }

      showInfo({
        title: 'Nenhuma resenha encontrada',
      });
    } catch (error) {
      showError({
        title: 'Erro ao buscar resenha.',
      });
    }
  };

  const handleCreateBlogPost = async () => {
    try {
      // Verifica se existe uma resenha autoral
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        showWarning({
          title: 'Resenha existente',
        });
        return;
      }

      setIsGeneratingBlogPost(true);
      const resultAction = await dispatch(createBlogPost(tconst));
      
      if (createBlogPost.fulfilled.match(resultAction)) {
        showSuccess({
          title: 'Resenha gerada com sucesso.',
        });
        router.push(`/dashboard/blogposts/${tconst}`);
      } else {
        showWarning({
          title: 'Já existe uma resenha com IA para este filme.',
        });
      }
    } catch (error) {
      showWarning({
        title: 'Já existe uma resenha com IA para este filme.',
      });
    } finally {
      setIsGeneratingBlogPost(false);
    }
  };

  const handleCreateAuthoralReview = async () => {
    try {
      // Verifica se existe uma resenha autoral
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        showWarning({
          title: 'Resenha existente',
        });
        return;
      }

      // Verifica se existe uma resenha com IA
      const blogAction = await dispatch(fetchBlogPost(tconst));
      if (fetchBlogPost.fulfilled.match(blogAction) && blogAction.payload) {
        showWarning({
          title: 'Resenha existente',
        });
        return;
      }

      // Se não encontrar nenhuma resenha, redireciona para criar uma nova
      router.push(`/dashboard/write-review?tconst=${tconst}&primaryTitle=${data.primaryTitle}`);
    } catch (error) {
      // Se der erro 404, significa que não existe resenha, então podemos prosseguir com a criação
      if (error instanceof Error && error.message.includes('404')) {
        router.push(`/dashboard/write-review?tconst=${tconst}&primaryTitle=${data.primaryTitle}`);
      } else {
        showError({
          title: 'Erro ao verificar resenhas existentes.',
        });
      }
    }
  };

  const handleDeleteMain = async (filename: string) => {
    await dispatch(deleteMainImage({ tconst, filename }));
    dispatch(fetchMainImage({ tconst }));
  };

  const handleGenerateSticker = async (sequentialId?: number) => {
    try {
      const resultAction = await dispatch(generateSticker({ tconst, sequentialId }));
      
      if (generateSticker.fulfilled.match(resultAction)) {
        await dispatch(fetchAllStickers(tconst));
        
        showSuccess({
          title: 'Sticker gerado com sucesso!',
        });
      } else {
        showError({
          title: 'Erro ao gerar sticker',
        });
      }
    } catch (error) {
      showError({
        title: 'Erro ao gerar sticker',
      });
    }
  };

  const handleRemoveSticker = async (filename: string) => {
    try {
      const resultAction = await dispatch(deleteSticker({ tconst, filename }));
      
      if (deleteSticker.fulfilled.match(resultAction)) {
        showSuccess({
          title: 'Sticker removido com sucesso!',
        });
        
        await dispatch(fetchAllStickers(tconst));
      } else {
        showError({
          title: 'Erro ao remover sticker',
        });
      }
    } catch (error) {
      showError({
        title: 'Erro ao remover sticker',
      });
    }
  };

  const handleStickerClick = (sticker: {url: string, filename: string}) => {
    setSelectedSticker(sticker);
    setIsStickerModalOpen(true);
  };

  const handleMainImageClick = (image: {url: string, filename: string}) => {
    setSelectedMainImage(image);
    setIsMainImageModalOpen(true);
  };

  return (
    <S.PageContainer>
      <GoBack centerText={data.primaryTitle} />
      <ReviewButtons
        isGeneratingBlogPost={isGeneratingBlogPost}
        onCheckReviewType={checkReviewType}
        onCreateAuthoralReview={handleCreateAuthoralReview}
        onCreateBlogPost={handleCreateBlogPost}
        tconst={tconst}
        watched={data.watched}
      />

      {isOpen && (
        <EditModal
          data={data}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          tconst={tconst}
        />
      )}

        <MovieInfoCard
          data={data}
          existingKeywords={existingKeywords}
          onEditClick={() => setIsOpen(true)}
          onKeywordClick={handleKeywordClick}
          onKeywordDelete={handleKeywordDelete}
        />

      <S.CardsContainer>
        <LinksCard data={data} />
        
        <S.CardsRow>
          <TriviaCard trivia={data.trivia} />
          <QuotesCard quote={data.quote} />
        </S.CardsRow>
        
        <KeywordsCard
          existingKeywords={existingKeywords}
          onKeywordClick={handleKeywordClick}
          onKeywordDelete={handleKeywordDelete}
          plotKeywords={plotKeywords}
        />
      </S.CardsContainer>
      <MediaCard spotifyUrl={data.soundtrack} />

      <MainImageUpload
        images={images}
        onDeleteMain={handleDeleteMain}
        onGenerateSticker={handleGenerateSticker}
        onMainImageClick={handleMainImageClick}
        onUploadMainImage={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          await dispatch(uploadMainImage({ tconst, file }));
          dispatch(fetchMainImage({ tconst }));
        }}
        stickerStatus={stickerStatus}
        tconst={tconst}
        uploadMainStatus={uploadMainStatus}
      />

      <StickerSection
        onRemoveSticker={handleRemoveSticker}
        onStickerClick={handleStickerClick}
        stickers={stickers}
      />

      {isStickerModalOpen && (
        <StickerModal
          isOpen={isStickerModalOpen}
          onClose={() => setIsStickerModalOpen(false)}
          selectedSticker={selectedSticker}
        />
      )}

      {isMainImageModalOpen && (
        <MainImageModal
          isOpen={isMainImageModalOpen}
          onClose={() => setIsMainImageModalOpen(false)}
          selectedMainImage={selectedMainImage}
        />
      )}
    </S.PageContainer>
  );
}
