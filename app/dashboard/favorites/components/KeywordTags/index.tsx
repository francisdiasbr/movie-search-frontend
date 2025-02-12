import { Tag } from '@chakra-ui/react';
import React from 'react';

interface KeywordTagsProps {
  keywords: string[];
  maxTags?: number;
}

const KeywordTags: React.FC<KeywordTagsProps> = ({ keywords, maxTags = 5 }) => {
  const truncatedKeywords = keywords.slice(0, maxTags);

  return (
    <>
      {truncatedKeywords.map((keyword, index) => (
        <Tag key={index} colorScheme='cyan' m={1}>
          {keyword}
        </Tag>
      ))}
    </>
  );
};

export default KeywordTags;
