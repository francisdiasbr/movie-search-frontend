import { Tag, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';

interface FavoriteTagProps {
  colorScheme?: string;
  existingItems: string[];
  isSelected?: string[];
  items: string[];
  onItemClick: (item: string) => void;
  onItemDelete?: (item: string) => void;
}

export type { FavoriteTagProps };

const FavoriteTag: React.FC<FavoriteTagProps> = ({
  colorScheme = 'cyan',
  existingItems = [],
  isSelected = [],
  items = [],
  onItemClick,
  onItemDelete,
}) => {
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (item: string) => {
    if (onItemDelete && existingItems.includes(item)) {
      onItemDelete(item);
      setClickedItem(null);
    } else {
      onItemClick(item);
      setClickedItem(item);
    }
  };

  return (
    <Wrap spacing={2}>
      {items.map((item: string, index: number) => (
        <WrapItem key={index}>
          <Tag
            size='md'
            colorScheme={existingItems.includes(item) ? 'red' : colorScheme}
            onClick={() => handleClick(item)}
            cursor='pointer'
            display='flex'
            alignItems='center'
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            variant={isSelected && isSelected.includes(item) ? 'solid' : 'subtle'}
            border={isSelected && isSelected.includes(item) ? '2px solid #3182ce' : undefined}
          >
            {item}
            {existingItems.includes(item) && onItemDelete &&
              (hoveredItem === item ? (
                <FaTimes style={{ marginLeft: '4px' }} />
              ) : (
                <FaHeart style={{ marginLeft: '4px' }} />
              ))}
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default FavoriteTag;
