import React from 'react';

interface KeywordTagsProps {
  keywords: string[];
  maxTags?: number;
}

const KeywordTags: React.FC<KeywordTagsProps> = ({ keywords, maxTags = 5 }) => {
  return (
    <>
      {keywords.slice(0, maxTags).map((keyword, index) => (
        <span
          key={index}
          style={{
            background: '#e9d8fd',
            borderRadius: '4px',
            color: '#553c9a',
            display: 'inline-block',
            fontSize: '0.75rem',
            margin: '2px',
            padding: '2px 8px',
          }}
        >
          {keyword}
        </span>
      ))}
    </>
  );
};

export default KeywordTags;
