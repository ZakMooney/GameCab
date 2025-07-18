import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Pencil,
  ListOrdered,
  Heart,
  CircleCheckBig,
  TriangleAlert,
  Copy,
  Trash2,
} from 'lucide-react';

import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Select from '../ui/Select';

import DraggableGameCard from './DraggableGameCard';

const FavouritesDisplay = () => {
  const { 
    favourites, 
    favouritesCount, 
    clearFavourites, 
    getFavouritesSorted,
    reorderFavourites,
    exportFavourites
  } = useFavourites();
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [sortBy, setSortBy] = useState('custom');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [shareCode, setShareCode] = useState('');
  const [shareCodeLoading, setShareCodeLoading] = useState(true);

  useEffect(() => {
    setShareCodeLoading(true);
    const result = exportFavourites();
    if (result.success) {
      setShareCode(result.data);
    } else {
      console.error('export failed:', result.error);
    }
    setShareCodeLoading(false);
  }, [favourites]);

  const getSortedFavourites = () => {
    return getFavouritesSorted(sortBy);
  };

  const handleClearFavourites = () => {
    clearFavourites();
    setShowClearConfirm(false);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    // Disable drag mode if not using custom sort
    if (newSortBy !== 'custom') {
      setIsDragMode(false);
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDrop = (dragIndex, hoverIndex) => {
    reorderFavourites(dragIndex, hoverIndex);
  };

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(`https://gamecab.net/collection?share=${shareCode}`);
      toast.success('📋 Copied Link');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const noFavourites = !favouritesCount > 0;

  return (
    <div className="w-full mx-auto">
      <div className="">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="flex flex-wrap gap-4">
            <Select
              options={[
                { value: 'custom', label: 'Custom Order' },
                { value: 'recent', label: 'Recently Added' },
                { value: 'name', label: 'Name (A-Z)' },
                { value: 'rating', label: 'Highest Rated' },
                { value: 'release', label: 'Newest Release' }
              ]}
              value={sortBy}
              onChange={handleSortChange}
              disabled={isDragMode || noFavourites}
            />

            {sortBy === 'custom' && (
              <Button
                variant={
                  isDragMode ? 'primary' : 'outline'
                }
                icon={<ListOrdered className="w-4 h-4" />}
                onClick={() => setIsDragMode(!isDragMode)}
                disabled={isEditMode || noFavourites}
              >
                {isDragMode ? 'Done' : 'Reorder'}
              </Button>
            )}

            <Button
              variant={
                isEditMode ? 'primary' : 'outline'
              }
              icon={<Pencil className="w-4 h-4" />}
              onClick={() => setIsEditMode(!isEditMode)}
              disabled={(isDragMode && (sortBy === 'custom')) || noFavourites}
            >
              {isEditMode ? 'Done' : 'Edit'}
            </Button>

            <Button
              variant="outline"
              icon={<Copy className="w-4 h-4" />}
              onClick={() => handleCopyShare()}
              loading={shareCodeLoading}
              disabled={noFavourites}
            >
              Share Collection
            </Button>

            <Button
              variant="outlineDanger"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => setShowClearConfirm(true)}
              disabled={isDragMode || noFavourites}
            >
              Clear All
            </Button>
          </div>
        </div>

        {isEditMode && (
          <div className="bg-info/10 dark:bg-info-dark/10 border border-info dark:border-info-dark rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <CircleCheckBig className="w-5 h-5 text-info dark:text-info-dark mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <Typography
                  variant="body"
                  className="text-info dark:text-info-dark mb-1"
                >
                  Editing
                </Typography>
                <Typography
                  variant="body"
                  className="text-sm text-info dark:text-info-dark"
                >
                  Click the favourite button on any game below to remove it from your collection. Your list will be saved automatically.
                </Typography>
              </div>
            </div>
          </div>
        )}

        {isDragMode && (
          <div className="bg-info/10 dark:bg-info-dark/10 border border-info dark:border-info-dark rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <CircleCheckBig className="w-5 h-5 text-info dark:text-info-dark mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <Typography
                  variant="body"
                  className="text-info dark:text-info-dark mb-1"
                >
                  Reordering
                </Typography>
                <Typography
                  variant="body"
                  className="text-sm text-info dark:text-info-dark"
                >
                  Drag and drop cards to rearrange your favourites. Your custom order will be saved automatically.
                </Typography>
              </div>
            </div>
          </div>
        )}

      </div>

      {favouritesCount > 0 ? (
        <div className={`flex flex-wrap gap-4 xl:gap-8 justify-start max-w-[1240px] m-auto md:mt-8 ${
          isDragMode ? 'select-none' : ''
        }`}>
          {getSortedFavourites().map((game, index) => (
            <div key={game.id} className={`max-w-40 xl:max-w-[260px] w-full aspect-[3/4] flex items-center justify-center`}>
              <DraggableGameCard 
                game={game}
                index={index}
                isDragMode={isDragMode}
                isEditMode={isEditMode}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                key={game.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full mx-auto mt-8 md:mt-20 p-4 pt-0">
          <div className="text-center">
            <Heart className="w-12 h-12 mb-4 text-gray-400 mx-auto" />
            <Typography
              variant="h2"
              color="heading"
              align="center"
              className="mb-4"
            >
              No Favourite Games Yet
            </Typography>
            <div className="max-w-md mx-auto">
              <ul className="text-sm text-gray-600 space-y-2 flex flex-col items-center">
                <li className="flex items-start">
                  <span className="text-primary dark:text-primary-dark mr-2">•</span>
                  <Typography variant="li">
                    Search for games and click the ❤️ to favourite them
                  </Typography>
                </li>
                <li className="flex items-start">
                  <span className="text-primary dark:text-primary-dark mr-2">•</span>
                  <Typography variant="li">
                    Drag and drop to reorder your favourites
                  </Typography>
                </li>
                <li className="flex items-start">
                  <span className="text-primary dark:text-primary-dark mr-2">•</span>
                  <Typography variant="li">
                    Your favourites will be saved locally on this device
                  </Typography>
                </li>
                <li className="flex items-start">
                  <span className="text-primary dark:text-primary-dark mr-2">•</span>
                  <Typography variant="li">
                    Share your favourites with friends
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Display mode */}
      {/* {viewMode === 'grid' ? (
        <>
        </>
      ) : (
        <>
        </>
      )} */}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-sm mx-auto">
            <div className="text-center">
              <TriangleAlert className="w-12 h-12 mb-4 text-danger dark:text-danger-dark mx-auto" />
              <Typography
                variant="h2"
                color="heading"
                align="center"
                className="mb-4"
              >
                Clear All Favourites?
              </Typography>
              <Typography
                variant="body"
                className="mb-6"
                align="center"
              >
                This will permanently remove all {favouritesCount} games from your favourites. This action cannot be undone.
              </Typography>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowClearConfirm(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleClearFavourites}
                  className="w-full"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};

export default FavouritesDisplay;