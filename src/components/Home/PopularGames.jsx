import React, { useState, useEffect } from 'react';
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

import Typography from '../ui/Typography';

import GameCard from './GameCard';

const PopularGames = ({debouncedSearchTerm}) => {
  const [popularGames, setPopularGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { 
    getMostPlayedGamesWithDetails,
    isReady,
  } = useIGDB();

  const {
    loadingMessage,
    refreshLoadingMessage,
  } = useRandomLoadingMessage();

  useEffect(() => {
    if (isReady) {
      if (debouncedSearchTerm === '') {
        loadPopularGames();
      }  
    }
  }, [isReady, debouncedSearchTerm]);

  const loadPopularGames = async () => {
    setIsLoading(true);
    refreshLoadingMessage();
    try {
      let popularityData;

      popularityData = await getMostPlayedGamesWithDetails();

      setPopularGames(popularityData);
    } catch (err) {
      console.error('failed to load popular games:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">      
      {isLoading ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularGames.map((item, index) => (
            <div key={index} className="relative">
              {item.game && <GameCard game={item.game} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularGames;