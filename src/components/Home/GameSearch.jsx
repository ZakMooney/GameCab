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
import { gameCategories } from '../../helpers/IGDB';
import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Loader from '../ui/Loader';

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
      <Card className="relative -mt-20 mx-0 sm:mx-16 md:mx-42 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col flex-1 items-end">

          <div className="relative w-full flex gap-2 flex-wrap flex-col sm:flex-row">
            <div className="relative flex-1">
              <Input 
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for games..."
                icon={<Search className="w-5 h-5 text-gray-400"/>}
              />
            </div>
          </div>

          <div className="w-full flex flex-col-reverse gap-4 sm:flex-row justify-between mt-4">
            <div>
              <Button
                onClick={() => navigate('/collection')}
                variant={favouritesCount > 0 ? 'primary' : 'outline'}
                size="lg"
                className="relative w-full"
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
                  variant="ghost"
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
                <div className="absolute top-full right-0 mt-2 w-full bg-bg-content dark:bg-bg-content-dark rounded-lg shadow-2xl z-10 p-4" ref={filterRef}>
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

      <div className="mt-4 sm:mt-8 mb-8 sm:mb-16">
        {isSearching || hasSearched || error ? (
          <div className="w-full mx-auto">
            <Typography
              variant="h1"
              className="mb-4"
            >
              Search Results
            </Typography>
            {isSearching && (
              <div className="flex flex-col items-center text-center py-12">
                <Loader className="mb-4 md:mb-8" />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          null
        )}
      </div>

      <div className="mt-4">
        <Typography
          variant="h1"
          className="mb-4"
        >
          {/* <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-300" /> */}
          Most Popular
        </Typography>
        <PopularGames />
      </div>
    </>
    
  );
};

export default GameSearch;