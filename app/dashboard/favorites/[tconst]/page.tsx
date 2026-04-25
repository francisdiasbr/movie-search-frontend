import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MediaCard from '../../../../app/ui/Cards/MediaCard';
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
import StickerModal from './components/StickerModal';
import StickerSection from './components/StickerSection';
import TriviaCard from './components/TriviaCard';
import EditModal from './edit/editModal';
import * as S from './styles';

export default function MovieDetailsPage() {
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<{url: string, filename: string} | null>(null);
  const [isMainImageModalOpen, setIsMainImageModalOpen] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<{url: string, filename: string} | null>(null);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

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
    if (fetchStatus === 'loading') return <LoadingSpinner />;
    return <div>No data found.</div>;
  }

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];

  const handleKeywordClick = async (keyword: string) => {
    const resultAction = await dispatch(postKeyword(keyword));

    if (postKeyword.fulfilled.match(resultAction)) {
      setExistingKeywords((prev) => [...prev, keyword]);
      showSuccess({ title: 'Palavra-chave adicionada.' });
    } else {
      const isConflict =
        resultAction.payload &&
        typeof resultAction.payload === 'string' &&
        resultAction.payload.includes('409');

      if (isConflict) {
        if (existingKeywords.includes(keyword)) {
          showInfo({ title: 'Palavra-chave já existe.', duration: 2000 });
        } else {
          showWarning({ title: 'Palavra-chave não permitida.' });
        }
      } else {
        showError({ title: 'Erro ao adicionar palavra-chave.' });
      }
    }
  };

  const handleKeywordDelete = async (keyword: string) => {
    const resultAction = await dispatch(deleteKeyword(keyword));
    if (deleteKeyword.fulfilled.match(resultAction)) {
      setExistingKeywords((prev) => prev.filter((k) => k !== keyword));
      showSuccess({ title: 'Palavra-chave removida.' });
    } else {
      showError({ title: 'Erro ao remover palavra-chave.' });
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
        showSuccess({ title: 'Sticker gerado com sucesso!' });
      } else {
        showError({ title: 'Erro ao gerar sticker' });
      }
    } catch (error) {
      showError({ title: 'Erro ao gerar sticker' });
    }
  };

  const handleRemoveSticker = async (filename: string) => {
    try {
      const resultAction = await dispatch(deleteSticker({ tconst, filename }));
      if (deleteSticker.fulfilled.match(resultAction)) {
        showSuccess({ title: 'Sticker removido com sucesso!' });
        await dispatch(fetchAllStickers(tconst));
      } else {
        showError({ title: 'Erro ao remover sticker' });
      }
    } catch (error) {
      showError({ title: 'Erro ao remover sticker' });
    }
  };

  return (
    <S.PageContainer>
      <GoBack centerText={data.primaryTitle} />

      {isOpen && (
        <EditModal data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} tconst={tconst} />
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
        onMainImageClick={(image) => { setSelectedMainImage(image); setIsMainImageModalOpen(true); }}
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
        onStickerClick={(sticker) => { setSelectedSticker(sticker); setIsStickerModalOpen(true); }}
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
