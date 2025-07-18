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
        <Card className="">
          <Typography
            variant='h3'
            className="mb-4"
          >
            Shared Collection
          </Typography>
          <FavouritesShared decoded={decoded} decodedLoading={decodedLoading} />
        </Card>
      </section>
    )
  }

  return (
    <section className="gc-container">
      {/* <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[400px_1fr] gap-4"> */}
      <div className="grid grid-cols-1 gap-4">
        {/* <div className="flex flex-col gap-4">
          <Card className="">
            <Typography
              variant='h3'
              className="mb-4"
            >
              Stats
            </Typography>
            <FavouritesStats />
          </Card>

          <Card className="">
            <Typography
              variant='h3'
              className="mb-4"
            >
              Actions
            </Typography>
            <FavouritesActions />
          </Card>
        </div> */}

        <Card className="">
          <Typography
            variant='h3'
            className="mb-4"
          >
            Collection
          </Typography>
          <FavouritesDisplay />
        </Card>
      </div>
    </section>
  );
};

export default Collection;