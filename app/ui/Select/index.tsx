import { SelectHTMLAttributes } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

import { SelectOption } from '../../util/select';
import * as S from './styles';
import type { SelectSize } from './types';

export type { SelectSize } from './types';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size' | 'value'> {
  // Shows a × inside the field when something is selected; clicking it
  // sends '' (the placeholder) back.
  clearable?: boolean;
  // Accessible name; the placeholder is what the eye reads.
  label: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  // Text of the empty option (value '').
  placeholder?: string;
  size?: SelectSize;
  value: string;
}

// A native <select> (keyboard, screen readers and the phone's own picker for
// free) with the app's look: custom chevron, grey placeholder, highlighted
// when a filter is active.
const Select = ({
  clearable = false,
  label,
  onChange,
  options,
  placeholder,
  size = 'medium',
  value,
  ...rest
}: SelectProps) => {
  const isEmpty = value === '';
  const showClear = clearable && !isEmpty && !rest.disabled;

  return (
    <S.Wrapper $size={size}>
      <S.Native
        $active={clearable && !isEmpty}
        $placeholder={isEmpty}
        $size={size}
        aria-label={label}
        onChange={event => onChange(event.target.value)}
        value={value}
        {...rest}
      >
        {placeholder !== undefined && <option value=''>{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Native>
      {showClear ? (
        <S.Clear aria-label={`Limpar ${label.toLowerCase()}`} onClick={() => onChange('')} type='button'>
          <FaTimes />
        </S.Clear>
      ) : (
        <S.Chevron>
          <FaChevronDown />
        </S.Chevron>
      )}
    </S.Wrapper>
  );
};

export default Select;
