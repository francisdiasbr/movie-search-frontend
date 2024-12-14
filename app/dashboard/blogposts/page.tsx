'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { searchBlogPosts } from '../../../lib/features/blogPosts/searchBlogPostsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { RootState } from '../../../lib/store';
import * as S from './styles';

export default function BlogPostsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.searchBlogPost
  );
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(async () => {
    console.log('Texto digitado:', query);
    console.log('Texto após trim:', query.trim());

    const params = {
      filters: query.trim()
        ? {
            $or: [
              { title: { $regex: query.trim(), $options: 'i' } },
              { primaryTitle: { $regex: query.trim(), $options: 'i' } },
              { introduction: { $regex: query.trim(), $options: 'i' } },
            ],
          }
        : {},
    };
    console.log('Parâmetros enviados para API:', params);

    await dispatch(searchBlogPosts(params));
  }, [query, dispatch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleCardClick = (tconst: string) => {
    router.push(`/dashboard/blogposts/${tconst}`);
  };

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  console.log(entries);
  return (
    <S.Container>
      {!hasEntries && (
        <S.NoPostsMessage>Nenhum post encontrado.</S.NoPostsMessage>
      )}
      {hasEntries && (
        <S.PostsGrid>
          {entries.map(post => (
            <S.StyledCard
              key={`${post.tconst}-${post.title}`}
              onClick={() => handleCardClick(post.tconst)}
            >
              <S.CardContent>
                <S.CardHeader>
                  <Image
                    src='https://github.com/francisdiasbr.png'
                    alt='Francis Dias'
                    width={40}
                    height={40}
                    style={{
                      borderRadius: '50%',
                    }}
                  />
                  <h3>{post.title}</h3>
                </S.CardHeader>
                <S.CardDate>{post.created_at}</S.CardDate>
              </S.CardContent>
            </S.StyledCard>
          ))}
        </S.PostsGrid>
      )}
    </S.Container>
  );
}
