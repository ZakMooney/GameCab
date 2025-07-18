import React from 'react';

import { Heart } from 'lucide-react';

import { getCategoryName } from '../../helpers/IGDB';
import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import StarRating from '../ui/StarRating';
import Card from '../ui/Card';

const GameCard = ({ game, showFavouriteButton = true }) => {
  const { isFavourite, toggleFavourite } = useFavourites();

  if (!game) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <div className="text-center">
          <Typography
            variant="h5"
            className="text-gray-800"
          >
            Game Not Found
          </Typography>
        </div>
      </div>
    );
  }

  const releaseYear = game.first_release_date 
    ? new Date(game.first_release_date * 1000).getFullYear()
    : 'Unknown';

  const rating = game.total_rating ? game.total_rating.toFixed(1) : 'N/A';
  const isGameFavourited = isFavourite(game.id);

  // Handle cover image URL
  const getCoverUrl = (coverUrl) => {
    if (!coverUrl) return null;
    // Convert thumbnail to larger image
    return coverUrl.replace('t_thumb', 't_cover_big');
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation(); // Prevent any parent click handlers
    toggleFavourite(game);
  };

  const category = getCategoryName(game.category);

  return (
    <Card className="flex h-full hover:shadow-xl hover:-translate-y-1 relative" slim>
      {showFavouriteButton && (
        <button
          onClick={handleFavouriteClick}
          className={`group absolute cursor-pointer top-3 right-3 rounded-full transition-all duration-200 z-auto hover:top-2 hover:right-2 hover:p-1 bg-neutral-500/0 hover:bg-neutral-500/60`}
          title={isGameFavourited ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isGameFavourited ? (
            <>
              <Heart 
                size="24" 
                className="transition-all duration-200 fill-red-500 stroke-gray-900/0 group-hover:fill-red-500 group-hover:stroke-gray-900/0"
              />
            </>
          ) : (
            <>
              <Heart 
                size="24"
                className="transition-all duration-200 fill-white/20 stroke-gray-900/80 dark:stroke-gray-500/80 dark:fill-white/0 group-hover:fill-white"
              />
            </>
          )}
        </button>
      )}

      {game.cover?.url && (
        <div className="text-center mr-4">
          <img 
            src={getCoverUrl(game.cover.url)} 
            alt={game.name}
            className="max-w-[120px] h-auto rounded shadow-md mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="text-left">
        <Typography
          variant="h5"
          color="heading"
        >
          {game.name}
        </Typography>
        <Typography
          variant="caption"
          className="mb-1"
        >
          ({releaseYear})
        </Typography>

        <div className="mb-3 space-y-1">
          <StarRating rating={rating} maxStars={5} size={12} dark/>
          <Typography
            variant="caption"
          >
            {category}
          </Typography>
          
          {game.platforms && game.platforms.length > 0 && (
            <Typography
              variant="caption"
              color="muted"
            >
              {game.platforms.slice(0, 3).map(platform => platform.name).join(', ')}
              {game.platforms.length > 3 && ' & More'}
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GameCard;