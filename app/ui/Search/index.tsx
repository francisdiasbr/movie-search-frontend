import Select from 'react-select';

import * as S from './styles';

interface SearchProps {
  country?: string;
  countryOptions?: { value: string; label: string }[];
  isLoading: boolean;
  searchTerm: string;
  setCountry?: (value: string) => void;
  setSearchTerm: (value: string) => void;
  setWatched?: (value: boolean | undefined) => void;
  setYear?: (value: number) => void;
  showAllFields?: boolean;
  watched?: boolean;
  year?: number;
  yearOptions?: { value: string; label: string }[];
}

const selectStyles = {
  container: (provided: any) => ({ ...provided, height: '40px', minWidth: '200px' }),
  control: (provided: any) => ({ ...provided, height: '40px', minHeight: '40px' }),
  input: (provided: any) => ({ ...provided, boxShadow: 'none' }),
};

const Search = ({
  country,
  countryOptions,
  searchTerm,
  setCountry,
  setSearchTerm,
  setWatched,
  setYear,
  showAllFields = false,
  watched,
  year,
  yearOptions,
}: SearchProps) => {
  return (
    <S.SearchContainer>
      <input
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
            styles={selectStyles}
            value={countryOptions?.find(option => option.value === country) || null}
          />
          <Select
            isClearable
            onChange={e => setYear && setYear(e ? parseInt(e.value, 10) : 0)}
            options={yearOptions}
            placeholder='Ano'
            styles={selectStyles}
            value={year ? { value: year.toString(), label: year.toString() } : null}
          />
          <Select
            isClearable
            onChange={selectedOption => {
              if (setWatched) {
                setWatched(selectedOption ? selectedOption.value === 'true' : undefined);
              }
            }}
            options={[
              { value: 'true', label: 'Assistidos' },
              { value: 'false', label: 'Não assistidos' },
            ]}
            placeholder='Status de assistido'
            styles={selectStyles}
            value={
              watched === undefined
                ? null
                : watched
                ? { value: 'true', label: 'Assistidos' }
                : { value: 'false', label: 'Não assistidos' }
            }
          />
        </>
      )}
    </S.SearchContainer>
  );
};

export default Search;
