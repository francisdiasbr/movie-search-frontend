import React from "react";
import { Button, Input } from '@chakra-ui/react';
import Select from 'react-select';

import * as S from './styles';

interface SearchProps {
  country?: string;
  countryOptions: { value: string; label: string }[];
  setCountry?: (value: string) => void;
  setYear?: (value: number) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  showAllFields?: boolean;
  handleSearch: () => void;
  isLoading: boolean;
  isFavoritePage?: boolean;
  year?: number;
  yearOptions?: { value: string; label: string }[];
}

const Search = ({
  country,
  countryOptions,
  isFavoritePage,
  setCountry,
  setSearchTerm,
  searchTerm,
  handleSearch,
  isLoading,
  showAllFields = false,
  year,
  setYear,
  yearOptions,
}: SearchProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <h1>{isFavoritePage ? 'Favorite a movie in your personal collection' : 'Search movie in Internet Movie Database'}</h1>
      <S.SearchContainer>
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
              isClearable
              isSearchable
              onChange={(selectedOption) => setCountry && setCountry(selectedOption ? selectedOption.value : '')}
              options={countryOptions}
              placeholder="Select country"
              styles={{ container: (provided) => ({ ...provided, minWidth: '200px' }) }}
              value={countryOptions.find(option => option.value === country) || null}
            />
            <Select
              isClearable
              onChange={(e) => setYear && setYear(e ? parseInt(e.value, 10) : 0)}
              options={yearOptions}
              placeholder="Select year"
              styles={{ container: (provided) => ({ ...provided, minWidth: '200px' }) }}
              value={year ? { value: year.toString(), label: year.toString() } : null}
            />
            </>
        )}
        <Button isLoading={isLoading} onClick={() => handleSearch()} style={{ width: '150px' }}>
          Go
        </Button>
      </S.SearchContainer>
    </>
  );
};

export default Search;
