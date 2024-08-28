'use client';

import { Button, Input, Select } from '@chakra-ui/react';
import React from "react";

interface SearchProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  handleSearch: () => void;
  isLoading: boolean;
  country?: string;
  setCountry?: (value: string) => void;
}

const Search = ({ country, setCountry, setSearchTerm, searchTerm, handleSearch, isLoading }: SearchProps) => {

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
        {country !== undefined && setCountry && (
          <Select
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Select a country'
            value={country}
          >
            <option value='Brazil'>Brazil</option>
            <option value='United States'>United States</option>
            <option value='Italy'>Italy</option>
          </Select>
        )}
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