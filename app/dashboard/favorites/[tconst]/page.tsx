import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MediaCard from '../../../ui/MediaCard';
import { fetchDetails, resetState } from '../reducer/movieDetailsSlice';
import { fetchMainImage, uploadMainImage, deleteMainImage } from '../reducer/mainImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { ROUTES } from '../../../const';
import { useKeywords } from '../../keywords/useKeywords';
import { useToastNotifications } from '../../../hooks/useToastNotifications';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import GoBack from '../../components/GoBack';
import MainImageModal from './components/MainImageModal';
import MainImageUpload from './components/MainImageUpload';
import MovieInfoCard from './components/MovieInfoCard';
import FavoriteTag from './components/FavoriteTag';
import { sanitizeTrivia, formatQuote } from './utils';
import EditInfoModal from './components/EditInfoModal';
import { imdbTitleUrl } from '../../../util/url';
import * as S from './styles';

export default function MovieDetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMainImageModalOpen, setIsMainImageModalOpen] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<{ url: string, filename: string } | null>(null);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  const { images, status: updateImageStatus } = useAppSelector((state) => state.mainImages);
  const { showSuccess, showError, showWarning, showInfo } = useToastNotifications();
  const { keywords: existingKeywords, load: loadKeywords, add: addKeyword, remove: removeKeyword } = useKeywords();

  useEffect(() => {
    dispatch(fetchDetails(tconst));
    dispatch(fetchMainImage({ tconst }));
    loadKeywords();
    return () => { dispatch(resetState()); };
  }, [dispatch, tconst]);

  if (!data) {
    if (fetchStatus === 'loading') return <LoadingSpinner />;
    return <div>No data found.</div>;
  }

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];

  const handleKeywordClick = async (keyword: string) => {
    const result = await addKeyword(keyword);
    if (result === 'added') showSuccess({ title: 'Palavra-chave adicionada.' });
    else if (result === 'duplicate') showInfo({ title: 'Palavra-chave já existe.', duration: 2000 });
    else if (result === 'conflict') showWarning({ title: 'Palavra-chave não permitida.' });
    else showError({ title: 'Erro ao adicionar palavra-chave.' });
  };

  const handleKeywordDelete = async (keyword: string) => {
    const ok = await removeKeyword(keyword);
    if (ok) showSuccess({ title: 'Palavra-chave removida.' });
    else showError({ title: 'Erro ao remover palavra-chave.' });
  };

  const handleDeleteMain = async (filename: string) => {
    await dispatch(deleteMainImage({ tconst, filename }));
    dispatch(fetchMainImage({ tconst }));
  };

  return (
    <S.PageContainer>
      <GoBack to={ROUTES.favorites} />
      <h2>{data.primaryTitle}</h2>

      {isOpen && (
        <EditInfoModal data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      <MovieInfoCard
        data={data}
        existingKeywords={existingKeywords}
        onEditClick={() => setIsOpen(true)}
        onKeywordClick={handleKeywordClick}
        onKeywordDelete={handleKeywordDelete}
      />

      <S.CardsContainer>
        <S.Card>
          <S.CardHeader><S.CardTitle>Links</S.CardTitle></S.CardHeader>
          <S.CardBody>
            <S.LinksGrid>
              <S.LinkItem>
                <S.LinkLabel>IMDB</S.LinkLabel>
                <S.LinkValue>
                  <a
                    href={data.imdb_url ?? imdbTitleUrl(data.tconst)}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ textDecoration: 'underline', color: 'blue' }}
                  >
                    {data.imdb_url ?? imdbTitleUrl(data.tconst)}
                  </a>
                </S.LinkValue>
              </S.LinkItem>
              {data.wiki && (
                <S.LinkItem>
                  <S.LinkLabel>Wiki</S.LinkLabel>
                  <S.LinkValue>
                    <a href={data.wiki} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline', color: 'blue' }}>
                      {data.wiki}
                    </a>
                  </S.LinkValue>
                </S.LinkItem>
              )}
              {Array.isArray(data.references) && data.references.length > 0 && (
                <S.LinkItem>
                  <S.LinkLabel>Referências</S.LinkLabel>
                  <S.LinkValue>
                    <ol style={{ marginLeft: '20px', paddingBottom: '10px' }}>
                      {data.references.map((reference: string, index: number) => (
                        <li key={index}>
                          <a href={reference} target='_blank' rel='noopener noreferrer' style={{ color: 'blue', textDecoration: 'underline' }}>
                            {reference}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </S.LinkValue>
                </S.LinkItem>
              )}
            </S.LinksGrid>
          </S.CardBody>
        </S.Card>
        {data.trivia && (
          <S.Card>
            <S.CardHeader><S.CardTitle>Trivia</S.CardTitle></S.CardHeader>
            <S.CardBody>
              <S.Content>
                <ul style={{ margin: 0, padding: 0 }}>
                  {sanitizeTrivia(data.trivia).map(({ key, text }) => (
                    <li key={key} style={{ marginLeft: '20px', paddingBottom: '10px' }}>{text}</li>
                  ))}
                </ul>
              </S.Content>
            </S.CardBody>
          </S.Card>
        )}
        {data.quote && (
          <S.Card>
            <S.CardHeader><S.CardTitle>Citações</S.CardTitle></S.CardHeader>
            <S.CardBody>
              <S.Content>{formatQuote(data.quote)}</S.Content>
            </S.CardBody>
          </S.Card>
        )}
        {plotKeywords.length > 0 && (
          <S.Card>
            <S.CardHeader><S.CardTitle>Palavras-chave</S.CardTitle></S.CardHeader>
            <S.CardBody>
              <S.Content>
                <FavoriteTag
                  existingItems={existingKeywords}
                  items={plotKeywords}
                  onItemClick={handleKeywordClick}
                  onItemDelete={handleKeywordDelete}
                />
              </S.Content>
            </S.CardBody>
          </S.Card>
        )}
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
        updateImageStatus={updateImageStatus}
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
