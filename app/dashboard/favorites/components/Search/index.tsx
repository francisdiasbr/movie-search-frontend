import { SelectOption } from '../../../../util/select';
import { FavoritesFilters } from '../../types';
import * as S from './styles';

export interface SearchValues extends FavoritesFilters {
  searchTerm: string;
}

interface SearchProps {
  countryOptions: SelectOption[];
  onChange: (values: SearchValues) => void;
  values: SearchValues;
  yearOptions: SelectOption[];
}

const WATCHED_OPTIONS: SelectOption[] = [
  { label: 'Assistidos', value: 'true' },
  { label: 'Não assistidos', value: 'false' },
];

const Search = ({ countryOptions, onChange, values, yearOptions }: SearchProps) => {
  const update = (patch: Partial<SearchValues>) => onChange({ ...values, ...patch });

  return (
    <S.SearchContainer>
      <input
        onChange={e => update({ searchTerm: e.target.value })}
        placeholder='Pesquisar'
        type='search'
        value={values.searchTerm}
      />
      <select aria-label='País' onChange={e => update({ country: e.target.value || undefined })} value={values.country ?? ''}>
        <option value=''>País</option>
        {countryOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <select
        aria-label='Ano'
        onChange={e => update({ startYear: e.target.value ? Number(e.target.value) : undefined })}
        value={values.startYear?.toString() ?? ''}
      >
        <option value=''>Ano</option>
        {yearOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <select
        aria-label='Status'
        onChange={e => update({ watched: e.target.value === '' ? undefined : e.target.value === 'true' })}
        value={values.watched === undefined ? '' : String(values.watched)}
      >
        <option value=''>Status</option>
        {WATCHED_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </S.SearchContainer>
  );
};

export default Search;
