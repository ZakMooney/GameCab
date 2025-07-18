import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Heart } from 'lucide-react';

import { useFavourites } from '../stores/FavouritesStore';

import FavouritesDisplay from "../components/Collection/FavouritesDisplay";
import FavouritesShared from "../components/Collection/FavouritesShared";
import FavouritesStats from "../components/Collection/FavouritesStats";
import FavouritesActions from "../components/Collection/FavouritesActions";

import Typography from "../components/ui/Typography";
import Card from "../components/ui/Card";

const Collection = () => {
  const [decoded, setDecoded] = useState([]);
  const [decodedLoading, setDecodedLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const { 
    decodeShared,
  } = useFavourites();
  
  const hasShare = searchParams.has('share');
  const shareCode = searchParams.get('share');

  useEffect(() => {
    if (shareCode) {
      setDecodedLoading(true);
      
      const result = decodeShared(shareCode);

      if (result.success) {
        setDecoded(result.data)
      } else {
        console.error('decode failed:', result.error)
      }
      setDecodedLoading(false);
    }
  }, [hasShare, shareCode]);

  if (hasShare) {
    return (
      <section className="gc-container">
        <Typography
          variant="h1"
          className="mb-4"
        >
          Shared Collection
        </Typography>
        <FavouritesShared decoded={decoded} decodedLoading={decodedLoading} />
      </section>
    )
  }

  return (
    <section className="gc-container">
      <Typography
        variant="h1"
        className="mb-4"
      >
        Your Collection
      </Typography>
      <FavouritesDisplay />
    </section>
  );
};

export default Collection;