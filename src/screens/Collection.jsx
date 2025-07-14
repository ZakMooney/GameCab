import React, { useState } from 'react';
import { Heart } from 'lucide-react';

import { useFavourites } from '../stores/FavouritesStore';

import FavouritesDisplay from "../components/Collection/FavouritesDisplay";
import FavouritesStats from "../components/Collection/FavouritesStats";

import Typography from "../components/ui/Typography";
import Card from "../components/ui/Card";

const Collection = () => {
  const { 
    favouritesCount, 
  } = useFavourites();
  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[400px_1fr] gap-4 md:gap-8">
        <Card className="">
          <FavouritesStats />
        </Card>

        <Card className="">
          <FavouritesDisplay />
        </Card>
      </div>
    </div>
  );
};

export default Collection;