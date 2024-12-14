import { Tag, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';

interface FavoriteTagProps {
  keywords: string[];
  selectedKeyword: string | null;
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
  existingKeywords: string[];
}

const FavoriteTag: React.FC<FavoriteTagProps> = ({
  keywords,
  selectedKeyword,
  onKeywordClick,
  onKeywordDelete,
  existingKeywords,
}) => {
  const [clickedKeyword, setClickedKeyword] = useState<string | null>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);

  const handleClick = (keyword: string) => {
    if (existingKeywords.includes(keyword)) {
      onKeywordDelete(keyword);
      setClickedKeyword(null);
    } else {
      onKeywordClick(keyword);
      setClickedKeyword(keyword);
    }
  };

  return (
    <Wrap spacing={2}>
      {keywords.map((keyword: string, index: number) => (
        <WrapItem key={index}>
          <Tag
            size='md'
            variant='surface'
            bg={
              existingKeywords.includes(keyword)
                ? hoveredKeyword === keyword
                  ? 'red.400'
                  : 'red.400'
                : clickedKeyword === keyword
                  ? 'red.400'
                  : hoveredKeyword === keyword
                    ? 'quaternary.100'
                    : 'secondary.300'
            }
            onClick={() => handleClick(keyword)}
            cursor='pointer'
            display='flex'
            alignItems='center'
            onMouseEnter={() => setHoveredKeyword(keyword)}
            onMouseLeave={() => setHoveredKeyword(null)}
          >
            {keyword}
            {existingKeywords.includes(keyword) &&
              (hoveredKeyword === keyword ? (
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
