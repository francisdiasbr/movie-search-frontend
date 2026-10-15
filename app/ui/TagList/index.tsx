import { useState } from 'react';
import { FaHeart, FaTimes } from 'react-icons/fa';

import * as S from './styles';

interface TagListProps {
  // Tags already saved as favourites: shown in pink with a heart, and
  // clicking them calls onRemove instead of onSelect.
  favorited?: string[];
  items: string[];
  onRemove?: (item: string) => void;
  onSelect: (item: string) => void;
  // Tags highlighted with a border (multi-select screens).
  selected?: string[];
}

// Row of clickable chips. Buttons, so they are reachable from the keyboard.
const TagList = ({ favorited = [], items, onRemove, onSelect, selected = [] }: TagListProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (item: string) => {
    if (onRemove && favorited.includes(item)) onRemove(item);
    else onSelect(item);
  };

  return (
    <S.List>
      {items.map(item => {
        const isFavorited = favorited.includes(item);
        return (
          <S.Tag
            $favorited={isFavorited}
            $selected={selected.includes(item)}
            key={item}
            onClick={() => handleClick(item)}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            type='button'
          >
            {item}
            {isFavorited && onRemove && (hovered === item ? <FaTimes /> : <FaHeart />)}
          </S.Tag>
        );
      })}
    </S.List>
  );
};

export default TagList;
