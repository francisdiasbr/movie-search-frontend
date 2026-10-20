import Select from '../../../../ui/Select';
import { SelectOption } from '../../../../util/select';
import { FavoritesFilters } from '../../types';
import YearRange from '../YearRange';
import * as S from './styles';

export interface SearchValues extends FavoritesFilters {
  searchTerm: string;
}

interface SearchProps {
  countryOptions: SelectOption[];
  onChange: (values: SearchValues) => void;
  values: SearchValues;
  yearBounds: { max: number; min: number };
}

const WATCHED_OPTIONS: SelectOption[] = [
  { label: 'Assistidos', value: 'true' },
  { label: 'Não assistidos', value: 'false' },
];

const Search = ({ countryOptions, onChange, values, yearBounds }: SearchProps) => {
  const update = (patch: Partial<SearchValues>) => onChange({ ...values, ...patch });

  return (
    <S.SearchContainer>
      <input
        onChange={e => update({ searchTerm: e.target.value })}
        placeholder='Pesquisar'
        type='search'
        value={values.searchTerm}
      />
      <Select
        clearable
        label='País'
        onChange={country => update({ country: country || undefined })}
        options={countryOptions}
        placeholder='País'
        value={values.country ?? ''}
      />
      <YearRange
        max={yearBounds.max}
        min={yearBounds.min}
        onChange={range => update({ startYearFrom: range.from, startYearTo: range.to })}
        value={{ from: values.startYearFrom, to: values.startYearTo }}
      />
      <Select
        clearable
        label='Status'
        onChange={watched => update({ watched: watched === '' ? undefined : watched === 'true' })}
        options={WATCHED_OPTIONS}
        placeholder='Status'
        value={values.watched === undefined ? '' : String(values.watched)}
      />
    </S.SearchContainer>
  );
};

export default Search;
