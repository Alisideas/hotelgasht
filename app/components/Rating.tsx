// components/Rating.tsx

import { useState } from 'react';

interface RatingProps {
  initialValue: number;
}

const Rating: React.FC<RatingProps> = ({ initialValue }) => {
  const [rating, setRating] = useState<number>(initialValue);

  const handleRatingChange = (newRating: number) => {
    // Logic to update the rating in the frontend
    setRating(newRating);

    // Logic to send the new rating to the backend
    // You would typically make an API call here to update the rating in the database
  };

  return (
    <div>
      {/* {[1, 2, 3, 4, 5].map((value) => ( */}
        <span
        //   key={value}
        //   onClick={() => handleRatingChange(value)}
        //   style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      {/* ))} */}
      <span>4.6</span>
    </div>
  );
};

export default Rating;
