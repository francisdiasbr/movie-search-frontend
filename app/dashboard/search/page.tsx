'use client';

import { Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import {
  addFavorite,
  resetAddStatus,
} from '../../../lib/features/movie/movieDetailsSlice';
import { searchMovie } from '../../../lib/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import Search from '../../ui/Search';
import Table from '../../ui/Table';
import { columnData } from './columnData';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector(
    state => state.moviesSearch
  );
  const { addStatus } = useAppSelector(state => state.moviesDetails);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [tconst, setTconst] = useState('');

  const handleSearch = (currentPage = page, currentPageSize = pageSize) => {
    setIsLoading(true);
    const filters: { tconst?: string } = {};
    if (tconst) {
      filters.tconst = tconst; // Adiciona tconst apenas se não estiver vazio
    }

    const params = {
      filters,
      page: currentPage + 1,
      pageSize: currentPageSize,
      searchTerm: searchTerm,
    };
    console.log('params', params);
    dispatch(searchMovie(params))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    handleSearch(0, newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleSearch(newPage, pageSize);
  };

  const handleAdd = (tconst: string) => {
    setIsLoading(true);
    dispatch(addFavorite(tconst))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    if (addStatus === 'succeeded') {
      toast({
        title: 'Sucesso',
        description: 'Filme adicionado aos favoritos.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetAddStatus());
    } else if (addStatus === 'failed') {
      toast({
        title: 'Erro ao adicionar',
        description: 'Filme já está na lista de favoritos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetAddStatus());
    }
  }, [addStatus, toast, dispatch]);

  return (
    <>
      <Text fontSize='2xl' as='b'>
        Pesquisar Filme
      </Text>
      <br />
      <br />
      <Search
        isLoading={isLoading}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tconst={tconst}
        setTconst={setTconst}
      />
      <Table
        columns={columnData}
        entries={entries}
        handleAdd={handleAdd}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        pageSize={pageSize}
        totalDocuments={total_documents}
      />
    </>
  );
}
