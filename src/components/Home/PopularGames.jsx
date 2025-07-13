import React, { useState } from 'react';
import useIGDB from '../../hooks/useIGDB';
import GameCard from './GameCard';

const PopularGames = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState('visits');
  
  const { 
    getMostPopularGamesByVisits, 
    getMostFollowedGames, 
    getMostRatedGames,
    getGamesDetails 
  } = useIGDB();

  const loadPopularGames = async (type = 'visits') => {
    setIsLoading(true);
    setActiveType(type);
    
    try {
      let popularityData;
      
      // Choose which popularity type to get
      switch (type) {
        case 'visits':
          popularityData = await getMostPopularGamesByVisits(8);
          break;
        case 'follows':
          popularityData = await getMostFollowedGames(8);
          break;
        case 'ratings':
          popularityData = await getMostRatedGames(8);
          break;
        default:
          popularityData = await getMostPopularGamesByVisits(8);
      }

      // Get full game details
      const gameIds = popularityData.map(item => item.game_id);
      const gameDetails = await getGamesDetails(gameIds);

      // Combine the data
      const combined = popularityData.map(popItem => ({
        game_id: popItem.game_id,
        popularity_value: popItem.value,
        popularity_type: type,
        game: gameDetails.find(game => game.id === popItem.game_id)
      }));

      setPopularGames(combined);
    } catch (err) {
      console.error('Failed to load popular games:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonClass = (type) => {
    const baseClass = "px-4 py-2 border rounded-md transition-colors duration-200 font-medium";
    const activeClass = "bg-blue-600 text-white border-blue-600";
    const inactiveClass = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    const disabledClass = "opacity-50 cursor-not-allowed";
    
    let classes = baseClass;
    if (activeType === type) {
      classes += ` ${activeClass}`;
    } else {
      classes += ` ${inactiveClass}`;
    }
    if (isLoading) {
      classes += ` ${disabledClass}`;
    }
    
    return classes;
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'visits': return 'Visits';
      case 'follows': return 'Follows';  
      case 'ratings': return 'Ratings';
      default: return 'Unknown';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Games</h2>
      
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => loadPopularGames('visits')} 
          disabled={isLoading}
          className={getButtonClass('visits')}
        >
          Most Visited
        </button>
        <button 
          onClick={() => loadPopularGames('follows')} 
          disabled={isLoading}
          className={getButtonClass('follows')}
        >
          Most Followed
        </button>
        <button 
          onClick={() => loadPopularGames('ratings')} 
          disabled={isLoading}
          className={getButtonClass('ratings')}
        >
          Most Rated
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="text-gray-600">Loading...</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {popularGames.map((item, index) => (
          <div key={index} className="relative">
            {item.game && <GameCard game={item.game} />}
            <div className="mt-3 px-3 py-2 bg-gray-100 rounded text-center">
              <small className="text-sm font-medium text-gray-700">
                {getTypeLabel(item.popularity_type)}: {item.popularity_value}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularGames;