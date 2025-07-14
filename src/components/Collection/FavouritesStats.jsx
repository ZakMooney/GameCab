import React from 'react';

import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';

const FavouritesStats = () => {
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
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Typography variant="h3" align="center" className="text-blue-600 dark:text-blue-500">
          {stats.totalGames || '0'}
        </Typography>
        <div className="text-2xl font-bold text-blue-600"></div>
        <Typography variant="body" className="text-sm" align="center">
          Total Games
        </Typography>
      </div>
      <div>
        <Typography variant="h3" align="center" className="text-green-600 dark:text-green-500">
          {stats.avgRating || '0'}
        </Typography>
        <Typography variant="body" align="center" className="text-sm">
          Avg Rating
        </Typography>
      </div>
      <div>
        <Typography variant="h3" align="center" className="text-purple-600 dark:text-purple-500">
          {stats.uniqueGenres || '0'}
        </Typography>
        <Typography variant="body" align="center" className="text-sm">
          Genres
        </Typography>
      </div>
      <div>
        <Typography variant="h3" align="center" className="text-orange-600 dark:text-orange-500">
          {stats.mostRecentlyAdded || 'N/A'}
        </Typography>
        <Typography variant="body" align="center" className="text-sm">
          Last Added
        </Typography>
      </div>
    </div>
  );
};

export default FavouritesStats;