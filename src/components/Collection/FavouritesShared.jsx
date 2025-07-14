import React, { Fragment, useState, useEffect } from 'react';

import {
  Pencil, 
  ListOrdered, 
  Heart, 
  CircleCheckBig, 
  TriangleAlert,
  LoaderCircle,
} from 'lucide-react';

import useIGDB from '../../hooks/useIGDB';
import { useFavourites } from '../../stores/FavouritesStore';
import { useRandomLoadingMessage } from '../../helpers/Loading';

import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Select from '../ui/Select';
import Switch from '../ui/Switch';

import DraggableGameCard from './DraggableGameCard';

const FavouritesShared = ({
  decoded,
  decodedLoading,
}) => {
  const [sharedGames, setSharedGames] = useState([]);
  const [sharedGamesLoading, setSharedGamesLoading] = useState(true);

  const { 
    getGamesByIds,
    isReady,
  } = useIGDB();

  const {
    loadingMessage,
    refreshLoadingMessage,
  } = useRandomLoadingMessage();

  useEffect(() => {
    if (isReady) {
      if (decoded) {
        loadSharedGames(decoded);
      }  
    }
  }, [isReady, decoded]);

  const loadSharedGames = async (gameIds) => {
    setSharedGamesLoading(true);
    refreshLoadingMessage();
    try {
      let sharedGames;

      sharedGames = await getGamesByIds(gameIds);

      setSharedGames(sharedGames);
    } catch (err) {
      console.error('failed to load shared games:', err);
    } finally {
      setSharedGamesLoading(false);
    }
  };


  return (
    <div className="w-full max-w-7xl mx-auto">
      
      {sharedGamesLoading ? (
        <>
          <div className="flex flex-col items-center text-center py-12">
            <LoaderCircle className="w-12 h-12 mb-4 text-blue-600 animate-spin" />
            <Typography
              variant="h3"
              align="center"
              className="mb-4"
            >
              Loading Collection
            </Typography>
            <Typography
              variant="body"
              align="center"
            >
              {loadingMessage}
            </Typography>
          </div>
        </>
      ) : (
        <>
          {sharedGames && sharedGames.length > 0 ? (
            <div className={`flex flex-wrap gap-4 justify-center`}>
              {sharedGames.map((game, index) => (
                <Fragment key={game.id}>
                  <DraggableGameCard 
                    game={game}
                    index={index}
                    isEditMode={true}
                    key={game.id}
                  />
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="w-full mx-auto p-4 pt-0">
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
        </>
      )}

    </div>
  );
};

export default FavouritesShared;