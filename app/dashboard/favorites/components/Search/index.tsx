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
          <select
            aria-label='País'
            onChange={e => setCountry && setCountry(e.target.value)}
            value={country || ''}
          >
            <option value=''>País</option>
            {countryOptions?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            aria-label='Ano'
            onChange={e => setYear && setYear(e.target.value ? parseInt(e.target.value, 10) : 0)}
            value={year?.toString() || ''}
          >
            <option value=''>Ano</option>
            {yearOptions?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            aria-label='Status'
            onChange={e => {
              if (setWatched) {
                const v = e.target.value;
                setWatched(v === '' ? undefined : v === 'true');
              }
            }}
            value={watched === undefined ? '' : watched ? 'true' : 'false'}
          >
            <option value=''>Status</option>
            <option value='true'>Assistidos</option>
            <option value='false'>Não assistidos</option>
          </select>
        </>
      )}
    </S.SearchContainer>
  );
};

export default Search;
