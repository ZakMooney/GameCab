import React from 'react';

import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import Input from '../ui/Input';
import Button from '../ui/Button';

const FavouritesActions = () => {
  const { 
    favourites, 
    favouritesCount, 
  } = useFavourites();

  const getStats = () => {
    const totalGames = favouritesCount;
    const ratedGames = favourites.filter(g => g.total_rating);
    const avgRating = ratedGames.length > 0 
      ? Math.round(ratedGames.reduce((acc, g) => acc + g.total_rating, 0) / ratedGames.length) 
      : 0;
    const uniqueGenres = new Set(favourites.flatMap(g => g.genres?.map(genre => genre.name) || [])).size;
    const uniquePlatforms = new Set(favourites.flatMap(g => g.platforms?.map(platform => platform.name) || [])).size;
    const mostRecentlyAdded = favourites.length > 0 
      ? new Date(Math.max(...favourites.map(g => new Date(g.favouritedAt)))).toLocaleDateString()
      : 'None';

    return { totalGames, avgRating, uniqueGenres, uniquePlatforms, mostRecentlyAdded };
  };

  const stats = getStats();

  return (
    <div className="grid grid-cols-1 gap-4">
      <Input 
        label="Share Link"
      />
    </div>
  );
};

export default FavouritesActions;