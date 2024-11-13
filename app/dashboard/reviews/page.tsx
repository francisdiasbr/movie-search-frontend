'use client';

import { Checkbox, Text, Input, Button, Switch, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import * as S from './styles';
import { fetchAllGeneratedReviews, clearGenerateReview } from '@/lib/features/allGenReviews/allGenReviewsSlice';
import { fetchAllAuthoralReviews, clearAuthoralReviewStatus } from '@/lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import ReviewCard from '@/app/ui/ReviewCard';

const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { entries: generatedEntries, status: generatedStatus } = useAppSelector((state) => state.allGenReviews);
  const { entries: authoralEntries, status: authoralStatus } = useAppSelector((state) => state.allAuthoralReviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showGeneratedReviews, setShowGeneratedReviews] = useState(true); // Alterna entre resenhas geradas e autorais
  const [filters, setFilters] = useState({ originalTitle: '', author: '', tconst: '' });

  // Função para buscar resenhas com base no tipo selecionado
  const fetchReviews = (type) => {
    const params = {
      page: 1,
      pageSize: 10,
      filters: showAllReviews ? {} : filters,
    };

    if (type) {
      dispatch(fetchAllGeneratedReviews(params));
      dispatch(clearAuthoralReviewStatus());
    } else {
      dispatch(fetchAllAuthoralReviews(params));
      dispatch(clearGenerateReview());
    }
  };

  useEffect(() => {
    fetchReviews(showGeneratedReviews);
  }, [showAllReviews, filters, showGeneratedReviews]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    fetchReviews(showGeneratedReviews);
  };

  const handleToggleChange = (e) => {
    const isGenerated = e.target.checked;
    setShowGeneratedReviews(isGenerated);
    fetchReviews(isGenerated);
  };

  return (
    <S.PageContainer>
      <Text fontSize='2xl' as='b'>Reviews</Text>
      <p>The reviews for the movie you watched</p>
      
      <Checkbox
        isChecked={showAllReviews}
        onChange={(e) => setShowAllReviews(e.target.checked)}
      >
        Show All Reviews
      </Checkbox>

      <Stack direction="row" alignItems="center" marginY="1rem">
        <Text>Show Authoral Reviews</Text>
        <Switch
          isChecked={showGeneratedReviews}
          onChange={handleToggleChange}
        />
        <Text>Show Generated Reviews</Text>
      </Stack>

      {!showAllReviews && (
        <S.FilterContainer>
          <Input
            placeholder="Filter by Tconst"
            name="tconst"
            value={filters.tconst}
            onChange={handleFilterChange}
          />
          <Button onClick={handleSearch}>Search</Button>
        </S.FilterContainer>
      )}

      {showGeneratedReviews ? (
        <>
          <Text fontSize='1xl' as='b'>Generated Reviews</Text>
          {generatedEntries.map((entry: any) => (
            <ReviewCard
              key={entry.tconst}
              originalTitle={entry.originalTitle}
              review={entry.review}
              plot={entry.plot}
            />
          ))}
        </>
      ) : (
        <>
          <Text fontSize='1xl' as='b'>Authoral Reviews</Text>
          {authoralEntries.map((entry: any) => (
            <ReviewCard 
              key={entry.tconst}
              originalTitle={entry.originalTitle}
              review={entry.review}
            />
          ))}
        </>
      )}
    </S.PageContainer>
  );
}

export default ReviewsPage;
