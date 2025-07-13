import React, { useState } from 'react';

import { Heart, GripVertical } from 'lucide-react';

import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import StarRating from '../ui/StarRating';

const DraggableGameCard = ({ 
  game, 
  index, 
  onDragStart, 
  onDragEnd, 
  onDragOver, 
  onDrop,
  isDragMode = false,
  isEditMode = false,
}) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  if (!game) {
    return (
      <div
        className="group rounded-r-md rounded-l-md bg-neutral-300 shadow-sm  transition-all duration-200 relative overflow-hidden cursor-default min-h-[160px]"
      >
        <div className="text-center relative bg-linear-to-b from-zinc-500 via-stone-600 to-zinc-900 w-full max-w-[160px] h-full shadow-md px-2 flex justify-center items-center">
          <Typography
            variant="gameTitle"
            align="center"
            color="white"
          >
            Game Not Found
          </Typography>
        </div>
      </div>
    );
  }

  const rating = game.total_rating ? game.total_rating.toFixed(1) : 'N/A';

  const isGameFavourited = isFavourite(game.id);

  const getCoverUrl = (coverUrl) => {
    if (!coverUrl) return null;
    return coverUrl.replace('t_thumb', 't_cover_big');
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavourite(game);
  };

  const handleDragStart = (e) => {
    if (!isDragMode) return;
    
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
    e.dataTransfer.setData('application/json', JSON.stringify({ index, gameId: game.id }));
    
    // delay to allow creating drag image
    setTimeout(() => {
      if (onDragStart) onDragStart(index);
    }, 0);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setIsDragOver(false);
    if (onDragEnd) onDragEnd();
  };

  const handleDragOver = (e) => {
    if (!isDragMode) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!isDragOver) {
      setIsDragOver(true);
      if (onDragOver) onDragOver(index);
    }
  };

  const handleDragLeave = (e) => {
    // only trigger if leaving card entirely, not just a child element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    if (!isDragMode) return;
    
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (onDrop && dragData.index !== index) {
        onDrop(dragData.index, index);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  return (
    <div
      draggable={isDragMode}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        group rounded-r-md rounded-l-md bg-neutral-300 shadow-sm 
        transition-all duration-200 relative overflow-hidden
        ${isDragMode ? (
          isDragging ? ('cursor-grabbing') : ('cursor-grab')
        ) : ('cursor-default')}
        ${isDragging ? 'opacity-50 scale-105 shadow-lg transform rotate-2' : ''}
        ${isDragOver ? 'ring-2 ring-blue-500 ring-opacity-50 transform scale-105' : ''}
        ${!isDragging && !isDragOver ? 'hover:shadow-md hover:-translate-y-1' : ''}
      `}
    >
      {isDragMode ? (
        <>
          <div
            className="absolute flex flex-row items-center justify-between top-0 h-[42px] w-full z-10 pl-1 pr-2 transition-all duration-200 bg-neutral-900/60 group-hover:bg-neutral-900/80 "
          >
            <div>
              <GripVertical 
                size="24"
                className="text-white/80 group-hover:text-white"
              />
            </div>
            <div className="text-xs px-2 py-1 rounded-lg font-bold z-10 transition-all bg-blue-500/80 group-hover:bg-blue-500/90 text-white">
              #{index + 1}
            </div>
          </div>
        </>
      ) : (null)}

      {isEditMode && (
        <button
          onClick={handleFavouriteClick}
          className={`absolute cursor-pointer top-3 right-3 rounded-full transition-all duration-200 z-10 hover:top-2 hover:right-2 hover:p-1 bg-neutral-900/0 hover:bg-neutral-900/60`}
          title={isGameFavourited ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isGameFavourited ? (
            <>
              <Heart 
                size="24" 
                className="transition-all duration-200 fill-red-500/60 stroke-white/0 group-hover:fill-red-500/90 group-hover:stroke-white/90"
              />
            </>
          ) : (
            <>
              <Heart 
                size="24"
                className="transition-all duration-200 fill-red-500/0 stroke-white/60 group-hover:fill-red-500/0 group-hover:stroke-white/90"
              />
            </>
          )}
        </button>
      )}

      {game.cover?.url ? (
        <div className="text-center relative w-full max-w-[160px] h-full shadow-md">
          <div className="absolute flex flex-col items-center bottom-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 pt-10 bg-gradient-to-t from-neutral-900/80 via-neutral-900/80 to-neutral-900/0">
            <Typography
              variant="gameTitle"
              align="center"
              color="white"
              className="mb-1"
            >
              {game.name}
            </Typography>
            <StarRating rating={rating} maxStars={5} size={12} textWhite/>
          </div>
          <img 
            src={getCoverUrl(game.cover.url)} 
            alt={game.name}
            className="max-w-[160px] h-auto pointer-events-none"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="text-center relative bg-gradient-to-br from-green-400 to-blue-600 w-full max-w-[160px] h-full shadow-md">
          <div className="absolute flex flex-col items-center w-full bottom-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 pt-10 bg-gradient-to-t from-neutral-900/80 via-neutral-900/80 to-neutral-900/0">
            <Typography
              variant="gameTitle"
              align="center"
              color="white"
              className="mb-1"
            >
              {game.name}
            </Typography>
            <StarRating rating={rating} maxStars={5} size={12} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default DraggableGameCard;