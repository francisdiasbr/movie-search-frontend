import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';

import * as S from './styles';

interface FavoriteTagProps {
  existingItems: string[];
  isSelected?: string[];
  items: string[];
  onItemClick: (item: string) => void;
  onItemDelete?: (item: string) => void;
}

export type { FavoriteTagProps };

const FavoriteTag: React.FC<FavoriteTagProps> = ({
  existingItems = [],
  isSelected = [],
  items = [],
  onItemClick,
  onItemDelete,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (item: string) => {
    if (onItemDelete && existingItems.includes(item)) {
      onItemDelete(item);
    } else {
      onItemClick(item);
    }
  };

  return (
    <S.TagList>
      {items.map((item, index) => {
        const isExisting = existingItems.includes(item);
        const isItemSelected = isSelected.includes(item);

        return (
          <S.Tag
            $isExisting={isExisting}
            $isSelected={isItemSelected}
            key={index}
            onClick={() => handleClick(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item}
            {isExisting && onItemDelete && (
              hoveredItem === item ? <FaTimes /> : <FaHeart />
            )}
          </S.Tag>
        );
      })}
    </S.TagList>
  );
};

export default FavoriteTag;
