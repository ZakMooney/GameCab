import React, { Fragment, useState } from 'react';
import { Pencil, ListOrdered, Heart, CircleCheckBig, TriangleAlert } from 'lucide-react';

import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Select from '../ui/Select';
import Switch from '../ui/Switch';

import DraggableGameCard from './DraggableGameCard';

const FavouritesDisplay = () => {
  const { 
    favourites, 
    favouritesCount, 
    clearFavourites, 
    getFavouritesSorted,
    reorderFavourites,
    moveToPosition,
  } = useFavourites();
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [sortBy, setSortBy] = useState('custom');
  const [viewMode, setViewMode] = useState('grid');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  const handleMoveToTop = (gameId) => {
    moveToPosition(gameId, 0);
  };

  const handleMoveToBottom = (gameId) => {
    moveToPosition(gameId, favouritesCount - 1);
  };

  if (favouritesCount === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center p-12">
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
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 md:mb-8">
          <div className="flex flex-wrap gap-3">
            {/* Edit Mode Toggle */}
            <Button
              variant={
                isEditMode ? 'primary' : 'secondary'
              }
              icon={<Pencil className="w-4 h-4" />}
              onClick={() => setIsEditMode(!isEditMode)}
              disabled={isDragMode && (sortBy === 'custom')}
            >
              {isEditMode ? 'Done' : 'Edit'}
            </Button>

            {/* Drag Mode Toggle */}
            {sortBy === 'custom' && (
              <Button
                variant={
                  isDragMode ? 'primary' : 'secondary'
                }
                icon={<ListOrdered className="w-4 h-4" />}
                onClick={() => setIsDragMode(!isDragMode)}
                disabled={isEditMode}
              >
                {isDragMode ? 'Done' : 'Reorder'}
              </Button>            
            )}

            {/* View Mode Toggle */}
            {/* <Switch
              options={[
                {value: 'grid', label: 'Grid'},
                {value: 'list', label: 'List'},
              ]}
              value={viewMode}
              onChange={setViewMode}
              disabled={isDragMode}
            /> */}

            {/* Sort Dropdown */}
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
              disabled={isDragMode}
            />

            {/* Clear All Button */}
            <Button
              variant="outlineDanger"
              onClick={() => setShowClearConfirm(true)}
              disabled={isDragMode}
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Drag Mode Instructions */}
        {isDragMode && (
          <div className="bg-info/10 dark:bg-info-dark/10 border border-info dark:border-info-dark rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CircleCheckBig className="w-5 h-5 text-info dark:text-info-dark mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <Typography
                  variant="body"
                  className="text-info dark:text-info-dark mb-1"
                >
                  Reorder Mode Active
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

      {/* Confirmation Modal */}
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

              <div className="flex gap-3">
              <Button
                variant="danger"
                icon={<Pencil className="w-4 h-4" />}
                onClick={() => setIsEditMode(!isEditMode)}
                disabled={isDragMode && (sortBy === 'custom')}
              >
                {isEditMode ? 'Done' : 'Edit'}
              </Button>

                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colours"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearFavourites}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colours"
                >
                  Clear All
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Games Display */}
      {viewMode === 'grid' ? (
        <div className={`flex flex-wrap gap-4 ${
          isDragMode ? 'select-none' : ''
        }`}>
          {getSortedFavourites().map((game, index) => (
            <Fragment key={game.id}>
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
            </Fragment>
          ))}
        </div>
      ) : (
        <div className={`flex flex-wrap gap-4 ${
          isDragMode ? 'select-none' : ''
        }`}>
          {getSortedFavourites().map((game, index) => (
            <Fragment key={game.id}>
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
            </Fragment>
          ))}
        </div>
      )}

    </div>
  );
};

export default FavouritesDisplay;