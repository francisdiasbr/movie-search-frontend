import React, { useState } from 'react';
import { Tag, Wrap, WrapItem } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface FavoriteTagProps {
  keywords: string[];
  selectedKeyword: string | null;
  onKeywordClick: (keyword: string) => void;
  existingKeywords: string[];
}

const FavoriteTag: React.FC<FavoriteTagProps> = ({ keywords, selectedKeyword, onKeywordClick, existingKeywords }) => {
  const [clickedKeyword, setClickedKeyword] = useState<string | null>(null);

  const handleClick = (keyword: string) => {
    onKeywordClick(keyword);
    setClickedKeyword(keyword);
  };

  return (
    <Wrap spacing={2}>
      {keywords.map((keyword: string, index: number) => (
        <WrapItem key={index}>
          <Tag
            size="md"
            variant="solid"
            bg={
              existingKeywords.includes(keyword)
                ? 'tertiary.300'
                : clickedKeyword === keyword
                ? 'tertiary.300'
                : 'secondary.300'
            }
            borderRadius='full'
            onClick={() => handleClick(keyword)}
            cursor='pointer'
          >
            {keyword}
            {(existingKeywords.includes(keyword) || clickedKeyword === keyword) && (
              <FaHeart style={{ marginLeft: '4px' }} />
            )}
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default FavoriteTag;