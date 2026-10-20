import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { ImageItem } from '../../../../lib/service/ImagesBaseService';
import { ROUTES } from '../../../const';
import { useStatusToast } from '../../../hooks/useStatusToast';
import { useLanguage } from '../../../language/LanguageProvider';
import Card from '../../../ui/Card';
import ExternalLink from '../../../ui/ExternalLink';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import MediaCard from '../../../ui/MediaCard';
import TagList from '../../../ui/TagList';
import GoBack from '../../components/GoBack';
import { useKeywords } from '../../keywords/useKeywords';
import { deleteMainImage, fetchMainImage, uploadMainImage } from '../reducer/mainImagesSlice';
import { fetchDetails, resetState, resetTranslateStatus, translateDetails } from '../reducer/movieDetailsSlice';
import EditInfoModal from './components/EditInfoModal';
import MainImageModal from './components/MainImageModal';
import MainImageUpload from './components/MainImageUpload';
import MovieInfoCard from './components/MovieInfoCard';
import * as S from './styles';
import { formatQuote } from './utils';

export default function MovieDetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<ImageItem | null>(null);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { changeLanguage, language } = useLanguage();

  const { data, error, fetchStatus, translateStatus } = useAppSelector(state => state.favoriteDetails);
  const { images, status: updateImageStatus } = useAppSelector(state => state.mainImages);
  const { keywords: favoritedKeywords, load: loadKeywords, add: addKeyword, remove: removeKeyword } = useKeywords();

  useEffect(() => {
    dispatch(fetchMainImage({ tconst }));
    loadKeywords();
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, loadKeywords, tconst]);

  // Reloads the texts whenever the global language changes. Older favorites
  // have no Portuguese version yet: the first time they are opened in PT the
  // backend translates them (a few seconds) and the page shows the result.
  useEffect(() => {
    const load = async () => {
      const movie = await dispatch(fetchDetails({ tconst, lang: language })).unwrap().catch(() => null);
      if (movie && language === 'pt' && movie.lang !== 'pt') dispatch(translateDetails(tconst));
    };
    load();
  }, [dispatch, language, tconst]);

  useStatusToast({
    error,
    errorMessage: 'Não foi possível traduzir o filme.',
    onFailure: () => changeLanguage('en'),
    reset: () => dispatch(resetTranslateStatus()),
    status: translateStatus,
    successMessage: 'Filme traduzido para o português.',
  });

  if (!data) {
    if (fetchStatus === 'loading') return <LoadingSpinner />;
    return <div>No data found.</div>;
  }

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];
  const references = Array.isArray(data.references) ? data.references : [];

  return (
    <S.PageContainer>
      <GoBack to={ROUTES.favorites} />

      {isOpen && <EditInfoModal data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <MovieInfoCard
        data={data}
        favoritedKeywords={favoritedKeywords}
        onEditClick={() => setIsOpen(true)}
        onKeywordSelect={addKeyword}
        onKeywordRemove={removeKeyword}
      />

      {(data.wiki || references.length > 0) && (
        <Card title='Links'>
          <S.LinksGrid>
          {data.wiki && (
            <S.Item>
              <S.Label>Wiki</S.Label>
              <S.Value>
                <ExternalLink href={data.wiki} />
              </S.Value>
            </S.Item>
          )}
          {references.length > 0 && (
            <S.Item>
              <S.Label>Referências</S.Label>
              <S.Value>
                <S.NumberedList>
                  {references.map((reference, index) => (
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
      )}

      {data.quote && (
        <Card title='Citações'>
          <S.QuoteBlock>{formatQuote(data.quote)}</S.QuoteBlock>
        </Card>
      )}

      {plotKeywords.length > 0 && (
        <Card title='Palavras-chave'>
          <TagList favorited={favoritedKeywords} items={plotKeywords} onRemove={removeKeyword} onSelect={addKeyword} />
        </Card>
      )}

      <MediaCard spotifyUrl={data.soundtrack} />

      <MainImageUpload
        images={images}
        onDeleteMain={filename => dispatch(deleteMainImage({ tconst, filename }))}
        onMainImageClick={setSelectedMainImage}
        onUploadMainImage={file => dispatch(uploadMainImage({ tconst, file }))}
        updateImageStatus={updateImageStatus}
      />

      {selectedMainImage && (
        <MainImageModal isOpen onClose={() => setSelectedMainImage(null)} selectedMainImage={selectedMainImage} />
      )}
    </S.PageContainer>
  );
}
