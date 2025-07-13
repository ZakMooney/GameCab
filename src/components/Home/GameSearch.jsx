import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import {
  Trophy,
  Search,
  X,
  Filter,
  Frown,
  LoaderCircle,
} from 'lucide-react';

import useIGDB from '../../hooks/useIGDB';
import { useRandomLoadingMessage } from '../../helpers/Loading';
import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Card from '../ui/Card';

import GameCard from './GameCard';
import PopularGames from './PopularGames';

const GameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);
  const navigate = useNavigate();

  const {
    searchGames,
    loading,
    error,
  } = useIGDB();
  const { 
    favouritesCount,
    selectedCategories, 
    setSelectedCategories,
  } = useFavourites();
  const {
    loadingMessage,
    refreshLoadingMessage,
  } = useRandomLoadingMessage();

  const toggleCategory = (categoryId) => {
    setSelectedCategories({
      ...selectedCategories,
      [categoryId]: !selectedCategories[categoryId]
    });
  };

  const getSelectedCategoriesCount = () => {
    return Object.values(selectedCategories).filter(Boolean).length;
  };

  const gameCategories = {
    0: 'Main Game',
    1: 'DLC/Addon',
    2: 'Expansion',
    3: 'Bundle',
    4: 'Standalone Expansion',
    5: 'Mod',
    6: 'Episode',
    7: 'Season',
    8: 'Remake',
    9: 'Remaster',
    10: 'Expanded Game',
    11: 'Port',
    12: 'Fork',
    13: 'Pack',
    14: 'Update'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.trim().length < 2) {
        setSearchResults([]);
        setHasSearched(false);
        return;
      }

      setIsSearching(true);
      setHasSearched(true);
      refreshLoadingMessage();

      try {
        const selectedCategoryIds = Object.keys(selectedCategories).filter(id => selectedCategories[id]);
        
        const results = await searchGames(debouncedSearchTerm, 12, selectedCategoryIds);
        setSearchResults(results || []);
      } catch (err) {
        console.error('Search failed:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm, selectedCategories, searchGames]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleCategoryToggle = (categoryId) => {
    toggleCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSelectedCategories({});
  };

  const handleResetFilters = () => {
    setSelectedCategories({
      0: true,
      2: true,
      4: true,
      8: true,
      9: true,
      10: true,
    });
  };

  return (
    <>
      <Card className="relative -mt-20 mx-8 md:mx-42 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col flex-1 items-end">

          <div className="relative w-full flex gap-2 flex-wrap flex-col sm:flex-row">
            <div className="relative flex-1">
              <div className="w-full flex justify-between mb-1 -mt-2 md:-mt-4">
                <Typography
                  variant="caption"
                  align="right"
                  color="muted"
                >
                  {hasSearched && !isSearching && searchResults.length > 0 && (
                    <>
                      Found {searchResults.length} game{searchResults.length !== 1 ? 's' : ''}
                    </>
                  )}
                  {hasSearched && !isSearching && searchResults.length === 0 && debouncedSearchTerm.length >= 2 && (
                      <>
                        No games found
                      </>
                    )}
                </Typography>

                <Typography
                  variant="caption"
                  align="right"
                  color="muted"
                >
                  Powered by <a href="https://www.igdb.com/" target="_blank">IGDB</a>
                </Typography>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for games..."
                className="w-full px-12 py-3 text-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base-text dark:text-base-text-dark"
              />
              
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>

              {searchTerm && (
                <Button
                  variant="ghost"
                  onClick={handleClearSearch}
                  icon={<X className="w-5 h-5" />}
                  size="xs"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                ></Button>              
              )}
            </div>

          </div>

          <div className="w-full flex justify-between mt-4">
            <div>
              <Button
                onClick={() => navigate('/collection')}
                variant={favouritesCount > 0 ? 'primary' : 'secondary'}
                size="lg"
                className="relative"
              >
                Your Collection
                {favouritesCount > 0 ? (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 dark:bg-red-400 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {favouritesCount}
                  </div>
                ) : null}
              </Button>              
            </div>
            <div>
            <div className="relative">
              <Button
                variant="secondary"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                icon={<Filter className="w-5 h-5 text-gray-600" />}
                size="lg"
                className="h-full w-full"
              >
                <div className="relative flex items-center">
                  <span>
                    Filters
                  </span>
                  {getSelectedCategoriesCount() > 0 && (
                    <span className="ml-1 sm:ml-1 opacity-100 sm:opacity-60">
                      ({getSelectedCategoriesCount()})
                    </span>
                  )}  
                </div>
              </Button>    
            </div>
              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-bg-content dark:bg-bg-content-dark border border-card-border dark:border-card-border-dark rounded-lg shadow-lg z-10 p-4" ref={filterRef}>
                  <div className="flex items-center justify-between mb-3">
                    <Typography
                      variant="h5"
                      color="heading"
                    >
                      Filter by Category
                    </Typography>
                    <div>
                      {getSelectedCategoriesCount() > 0 && (
                        <Button
                          variant="ghost"
                          onClick={handleClearFilters}
                          size="xs"
                        >
                          Clear all
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        onClick={handleResetFilters}
                        size="xs"
                      >
                        Reset all
                      </Button>            
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto grid grid-cols-2">
                    {Object.entries(gameCategories).map(([categoryId, categoryName]) => (
                      <label key={categoryId} className="flex items-center py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary-dark/10 rounded px-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories[categoryId] || false}
                          onChange={() => handleCategoryToggle(categoryId)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-base-text dark:text-base-text-dark">{categoryName}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="mt-8">
        {isSearching || hasSearched || error ? (
          <div className="w-full max-w-6xl mx-auto p-4">
            {isSearching && (
              <div className="flex flex-col items-center text-center py-12">
                <LoaderCircle className="w-12 h-12 mb-4 text-blue-600 animate-spin" />
                <Typography
                  variant="h3"
                  align="center"
                  className="mb-4"
                >
                  Searching
                </Typography>
                <Typography
                  variant="body"
                  align="center"
                >
                  {loadingMessage}
                </Typography>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <Frown className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-red-700">Error: {error}</span>
                </div>
              </div>
            )}

            {/* Search Results */}
            {hasSearched && !isSearching && (
              <div>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {searchResults.map((game, index) => (
                      <GameCard key={game.id || index} game={game} />
                    ))}
                  </div>
                ) : (
                  !isSearching && debouncedSearchTerm.length >= 2 && (
                    <div className="flex flex-col items-center text-center py-12">
                      <Frown className="w-12 h-12 mb-4 text-gray-400" />
                      <Typography
                        variant="h3"
                        align="center"
                        className="mb-4"
                      >
                        No Games Found
                      </Typography>
                      <Typography
                        variant="body"
                        align="center"
                      >
                        Try searching for a different game title
                      </Typography>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <PopularGames debouncedSearchTerm={debouncedSearchTerm} />
        )}
      </Card>

    </>
    
  );
};

export default GameSearch;