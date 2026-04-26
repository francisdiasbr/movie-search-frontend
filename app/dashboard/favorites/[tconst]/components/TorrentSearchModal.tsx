import { useEffect } from 'react';

import { fetchTorrents, resetTorrentSearch } from '../../../../../lib/features/torrentSearch/torrentSearchSlice';
import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import Dialog from '../../../../ui/Dialog';
import LoadingSpinner from '../../../../ui/LoadingSpinner';

interface TorrentSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryTitle: string;
}

export default function TorrentSearchModal({ isOpen, onClose, primaryTitle }: TorrentSearchModalProps) {
  const dispatch = useAppDispatch();
  const { results, status } = useAppSelector((state) => state.torrentSearch);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchTorrents(primaryTitle));
    }
    return () => { dispatch(resetTorrentSearch()); };
  }, [dispatch, isOpen, primaryTitle]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title='Baixar Filme'>
      {status === 'loading' && <LoadingSpinner />}
      {status === 'failed' && <p>Erro ao buscar torrents.</p>}
      {status === 'succeeded' && results.length === 0 && <p>Nenhum resultado encontrado.</p>}
      {status === 'succeeded' && results.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {results.slice(0, 10).map((torrent, index) => (
            <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <div style={{ fontSize: '13px', marginBottom: '6px' }}>{torrent.title}</div>
              <div style={{ alignItems: 'center', display: 'flex', gap: '12px' }}>
                <span style={{ color: '#666', fontSize: '12px' }}>
                  Seeds: {torrent.seeds} · Leechers: {torrent.leechers}
                </span>
                {torrent.magnet && (
                  <a href={torrent.magnet} rel='noopener noreferrer'>
                    <button type='button'>Baixar</button>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Dialog>
  );
}
