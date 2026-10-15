import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { ImageItem } from '../../../../lib/service/ImagesBaseService';
import { ROUTES } from '../../../const';
import { useToastNotifications } from '../../../hooks/useToastNotifications';
import Card from '../../../ui/Card';
import ExternalLink from '../../../ui/ExternalLink';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import MediaCard from '../../../ui/MediaCard';
import PageHeader from '../../../ui/PageHeader';
import { imdbTitleUrl } from '../../../util/url';
import GoBack from '../../components/GoBack';
import { useKeywords } from '../../keywords/useKeywords';
import { deleteMainImage, fetchMainImage, uploadMainImage } from '../reducer/mainImagesSlice';
import { fetchDetails, resetState } from '../reducer/movieDetailsSlice';
import EditInfoModal from './components/EditInfoModal';
import FavoriteTag from './components/FavoriteTag';
import MainImageModal from './components/MainImageModal';
import MainImageUpload from './components/MainImageUpload';
import MovieInfoCard from './components/MovieInfoCard';
import * as S from './styles';
import { formatQuote, sanitizeTrivia } from './utils';

export default function MovieDetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<ImageItem | null>(null);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { data, fetchStatus } = useAppSelector(state => state.moviesDetails);
  const { images, status: updateImageStatus } = useAppSelector(state => state.mainImages);
  const { showSuccess, showError, showWarning, showInfo } = useToastNotifications();
  const { keywords: existingKeywords, load: loadKeywords, add: addKeyword, remove: removeKeyword } = useKeywords();

  useEffect(() => {
    dispatch(fetchDetails(tconst));
    dispatch(fetchMainImage({ tconst }));
    loadKeywords();
    return () => {
      dispatch(resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tconst]);

  if (!data) {
    if (fetchStatus === 'loading') return <LoadingSpinner />;
    return <div>No data found.</div>;
  }

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];
  const imdbUrl = data.imdb_url ?? imdbTitleUrl(data.tconst);

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

  const refreshMainImages = () => dispatch(fetchMainImage({ tconst }));

  return (
    <S.PageContainer>
      <PageHeader title={data.primaryTitle}>
        <GoBack to={ROUTES.favorites} />
      </PageHeader>

      {isOpen && <EditInfoModal data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <MovieInfoCard
        data={data}
        existingKeywords={existingKeywords}
        onEditClick={() => setIsOpen(true)}
        onKeywordClick={handleKeywordClick}
        onKeywordDelete={handleKeywordDelete}
      />

      <Card title='Links'>
        <S.LinksGrid>
          <S.Item>
            <S.Label>IMDB</S.Label>
            <S.Value>
              <ExternalLink href={imdbUrl} />
            </S.Value>
          </S.Item>
          {data.wiki && (
            <S.Item>
              <S.Label>Wiki</S.Label>
              <S.Value>
                <ExternalLink href={data.wiki} />
              </S.Value>
            </S.Item>
          )}
          {Array.isArray(data.references) && data.references.length > 0 && (
            <S.Item>
              <S.Label>Referências</S.Label>
              <S.Value>
                <S.NumberedList>
                  {data.references.map((reference, index) => (
                    <li key={index}>
                      <ExternalLink href={reference} />
                    </li>
                  ))}
                </S.NumberedList>
              </S.Value>
            </S.Item>
          )}
        </S.LinksGrid>
      </Card>

      {data.trivia && (
        <Card title='Trivia'>
          <S.Content>
            <S.BulletList>
              {sanitizeTrivia(data.trivia).map(({ key, text }) => (
                <li key={key}>{text}</li>
              ))}
            </S.BulletList>
          </S.Content>
        </Card>
      )}

      {data.quote && (
        <Card title='Citações'>
          <S.Content>{formatQuote(data.quote)}</S.Content>
        </Card>
      )}

      {plotKeywords.length > 0 && (
        <Card title='Palavras-chave'>
          <FavoriteTag
            existingItems={existingKeywords}
            items={plotKeywords}
            onItemClick={handleKeywordClick}
            onItemDelete={handleKeywordDelete}
          />
        </Card>
      )}

      <MediaCard spotifyUrl={data.soundtrack} />

      <MainImageUpload
        images={images}
        onDeleteMain={async filename => {
          await dispatch(deleteMainImage({ tconst, filename }));
          refreshMainImages();
        }}
        onMainImageClick={setSelectedMainImage}
        onUploadMainImage={async file => {
          await dispatch(uploadMainImage({ tconst, file }));
          refreshMainImages();
        }}
        updateImageStatus={updateImageStatus}
      />

      {selectedMainImage && (
        <MainImageModal isOpen onClose={() => setSelectedMainImage(null)} selectedMainImage={selectedMainImage} />
      )}
    </S.PageContainer>
  );
}
