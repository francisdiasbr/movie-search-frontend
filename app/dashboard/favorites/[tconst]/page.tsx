import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MediaCard from '../../../ui/Cards/MediaCard';
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
import TriviaCard from './components/TriviaCard';
import EditModal from './edit/editModal';
import * as S from './styles';

export default function MovieDetailsPage() {
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMainImageModalOpen, setIsMainImageModalOpen] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<{ url: string, filename: string } | null>(null);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  const { showSuccess, showError, showWarning, showInfo } = useToastNotifications();
  const { images, status: uploadMainStatus } = useAppSelector((state) => state.uploadMainImages);
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
        <TriviaCard trivia={data.trivia} />
        <QuotesCard quote={data.quote} />
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
        onMainImageClick={(image) => { setSelectedMainImage(image); setIsMainImageModalOpen(true); }}
        onUploadMainImage={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          await dispatch(uploadMainImage({ tconst, file }));
          dispatch(fetchMainImage({ tconst }));
        }}
        uploadMainStatus={uploadMainStatus}
      />

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
