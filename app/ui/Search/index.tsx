import { Input } from '@chakra-ui/react';
import React from 'react';
import Select from 'react-select';

import * as S from './styles';

interface SearchProps {
  country?: string;
  countryOptions?: { value: string; label: string }[];
  setCountry?: (value: string) => void;
  setYear?: (value: number) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  showAllFields?: boolean;
  isLoading: boolean;
  isFavoritePage?: boolean;
  year?: number;
  yearOptions?: { value: string; label: string }[];
  setTconst?: (value: string) => void;
  tconst?: string;
  watched?: boolean;
  setWatched?: (value: boolean | undefined) => void;
}

const Search = ({
  country,
  countryOptions,
  setCountry,
  setSearchTerm,
  searchTerm,
  isLoading,
  showAllFields = false,
  year,
  setYear,
  yearOptions,
  watched,
  setWatched,
}: SearchProps) => {
  return (
    <>
      <S.SearchContainer>
        <S.SearchInput
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Pesquisar'
          type='search'
          value={searchTerm}
        />
        {showAllFields && (
          <>
            <Select
              isClearable
              isSearchable
              onChange={selectedOption => setCountry && setCountry(selectedOption ? selectedOption.value : '')}
              options={countryOptions}
              placeholder='País'
              styles={{
                container: provided => ({ ...provided, minWidth: '200px', height: '40px' }),
                control: provided => ({ ...provided, height: '40px', minHeight: '40px' }),
              }}
              value={countryOptions?.find(option => option.value === country) || null}
            />
            <Select
              isClearable
              onChange={e => setYear && setYear(e ? parseInt(e.value, 10) : 0)}
              options={yearOptions}
              placeholder='Ano'
              styles={{
                container: provided => ({ ...provided, minWidth: '200px', height: '40px' }),
                control: provided => ({ ...provided, height: '40px', minHeight: '40px' }),
              }}
              value={year ? { value: year.toString(), label: year.toString() } : null}
            />
            <Select
              isClearable
              onChange={selectedOption => {
                if (setWatched) {
                  if (!selectedOption) {
                    setWatched(undefined);
                  } else {
                    setWatched(selectedOption.value === 'true');
                  }
                }
              }}
              options={[
                { value: 'true', label: 'Assistidos' },
                { value: 'false', label: 'Não assistidos' }
              ]}
              placeholder='Status de assistido'
              styles={{
                container: provided => ({ ...provided, minWidth: '200px', height: '40px' }),
                control: provided => ({ ...provided, height: '40px', minHeight: '40px' }),
              }}
              value={
                watched === undefined 
                  ? null 
                  : watched === true 
                    ? { value: 'true', label: 'Assistidos' }
                    : { value: 'false', label: 'Não assistidos' }
              }
            />
          </>
        )}
      </S.SearchContainer>
    </>
  );
};

export default Search;
