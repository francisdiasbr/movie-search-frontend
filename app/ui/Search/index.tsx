'use client';

import { Button, Input, Select } from '@chakra-ui/react';
import React from "react";

interface SearchProps {
  country?: string;
  setCountry?: (value: string) => void;
  setYear?: (value: number) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  showAllFields?: boolean;
  handleSearch: () => void;
  isLoading: boolean;
  isFavoritePage?: boolean;
  year?: number;
}

const Search = ({ country, isFavoritePage, setCountry, setSearchTerm, searchTerm, handleSearch, isLoading, showAllFields = false, year, setYear }: SearchProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <h1>{isFavoritePage ? 'Favorite a movie in your personal collection' : 'Search movie in Internet Movie Database'}</h1>
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
        {showAllFields && (
          <>
            <Select
              onChange={(e) => setCountry && setCountry(e.target.value)}
              placeholder='Select country'
              value={country}
            >
              <option value='USA'>USA</option>
              <option value='Germany'>Germany</option>
              <option value='Italy'>Italy</option>
              <option value='UK'>UK</option>
              <option value='Brazil'>Brazil</option>
            </Select>
            <Select
              onChange={(e) => setYear && setYear(e.target.value ? parseInt(e.target.value, 10) : 0)} // Converte para número ou `0`
              placeholder="Select year"
              value={year ?? ""} // Exibe uma string vazia se `year` for `undefined`
            >
              {Array.from({ length: 100 }, (_, i) => {
                const currentYear = new Date().getFullYear();
                const yearOption = (currentYear - i).toString();
                return (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                );
              })}
            </Select>
          </>
        )}
        <Button
          isLoading={isLoading}
          onClick={() => handleSearch()}
          style={{ width: '150px' }}
        >
          Buscar
        </Button>
      </div>
    </>
  );
};

export default Search;