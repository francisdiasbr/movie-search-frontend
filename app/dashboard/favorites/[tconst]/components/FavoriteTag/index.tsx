import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';

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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map((item, index) => {
        const isExisting = existingItems.includes(item);
        const isItemSelected = isSelected.includes(item);

        return (
          <span
            key={index}
            onClick={() => handleClick(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              alignItems: 'center',
              background: isExisting ? '#fed7d7' : '#c4f1f9',
              border: isItemSelected ? '2px solid #3182ce' : '2px solid transparent',
              borderRadius: '4px',
              color: isExisting ? '#822727' : '#065666',
              cursor: 'pointer',
              display: 'inline-flex',
              fontSize: '0.875rem',
              fontWeight: isItemSelected ? 'bold' : 'normal',
              gap: '4px',
              padding: '2px 8px',
            }}
          >
            {item}
            {isExisting && onItemDelete && (
              hoveredItem === item ? <FaTimes /> : <FaHeart />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default FavoriteTag;
