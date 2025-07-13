import React, { useState } from 'react';
import { Star } from 'lucide-react';

import Typography from './Typography';

const StarRating = ({
  rating,
  maxStars = 5,
  size = 24,
  className = "",
  textWhite,
  dark
}) => {
  const stars = [];

  const convertTo5Stars = (rating) => {
    return rating / 20;
  };

  let useRating5Stars = 0;

  if (rating > 0) {
    useRating5Stars = convertTo5Stars(rating);
  }
  
  for (let i = 1; i <= maxStars; i++) {
    const fillPercentage = Math.max(0, Math.min(100, (useRating5Stars - i + 1) * 100));
    
    stars.push(
      <div key={i} className="relative inline-block">
        <Star 
          size={size} 
          className="text-gray-300 fill-gray-300/0"
        />
        <Star 
          size={size} 
          className="absolute top-0 left-0 text-yellow-400 fill-yellow-400"
          style={{
            clipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)`
          }}
        />
      </div>
    );
  }
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {stars}
      <Typography
        variant="caption"
        align="center"
        color={textWhite ? 'white' : 'default'}
      >
        {useRating5Stars.toFixed(2) || ''}
      </Typography>
    </div>
  );
};

export default StarRating;