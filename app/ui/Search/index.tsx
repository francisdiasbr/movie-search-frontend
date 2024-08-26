'use client';

import { Button, Input, useToast } from '@chakra-ui/react';
import React from "react";

interface SearchProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  handleSearch: () => void;
  isLoading: boolean;
}

const Search = ({ setSearchTerm, searchTerm, handleSearch, isLoading }: SearchProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <h1>Search movie</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for movies'
          type='search'
          value={searchTerm}
          onKeyDown={handleKeyDown}
        />
        <Button
          isLoading={isLoading}
          onClick={() => handleSearch()}
        >
          Buscar
        </Button>
      </div>
    </>
  );
};

export default Search;