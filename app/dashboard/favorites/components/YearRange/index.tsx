import * as S from './styles';

export interface YearRangeValue {
  from?: number;
  to?: number;
}

interface YearRangeProps {
  max: number;
  min: number;
  onChange: (value: YearRangeValue) => void;
  value: YearRangeValue;
}

// Two overlapping range inputs on one track. A bound equal to the limit is
// reported as undefined so the filter is only sent when it narrows the list.
const YearRange = ({ max, min, onChange, value }: YearRangeProps) => {
  const from = value.from ?? min;
  const to = value.to ?? max;
  const span = Math.max(1, max - min);
  const disabled = max <= min;

  const emit = (nextFrom: number, nextTo: number) =>
    onChange({
      from: nextFrom > min ? nextFrom : undefined,
      to: nextTo < max ? nextTo : undefined,
    });

  return (
    <S.Container aria-label='Ano'>
      <S.Label>{from}</S.Label>
      <S.Track>
        <S.Fill $left={((from - min) / span) * 100} $right={((max - to) / span) * 100} />
        <S.Thumb
          aria-label='Ano inicial'
          disabled={disabled}
          max={max}
          min={min}
          onChange={e => emit(Math.min(Number(e.target.value), to), to)}
          type='range'
          value={from}
        />
        <S.Thumb
          aria-label='Ano final'
          disabled={disabled}
          max={max}
          min={min}
          onChange={e => emit(from, Math.max(Number(e.target.value), from))}
          type='range'
          value={to}
        />
      </S.Track>
      <S.Label>{to}</S.Label>
    </S.Container>
  );
};

export default YearRange;
