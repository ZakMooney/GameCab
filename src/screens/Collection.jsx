import React, { useState } from 'react';
import { Heart } from 'lucide-react';

import { useFavourites } from '../stores/FavouritesStore';

import FavouritesDisplay from "../components/Collection/FavouritesDisplay";
import FavouritesStats from "../components/Collection/FavouritesStats";

import Typography from "../components/ui/Typography";
import Card from "../components/ui/Card";

const Collection = () => {
  const { 
    favouritesCount, 
  } = useFavourites();
  return (
    <div className="p-4">

      {favouritesCount === 0 ? (
        <Card className="mb-4 md:mb-8">
          <div className="w-full max-w-4xl mx-auto p-0 md:p-6">
            <div className="text-center p-0 md:p-12">
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
                <ul className="text-sm text-gray-600 space-y-2 flex flex-col items-start sm:items-center">
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
        </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[400px_1fr] gap-4 md:gap-8">
            <Card className="">
              <FavouritesStats />
            </Card>

            <Card className="">
              <FavouritesDisplay />
            </Card>
          </div>
        )
      }
    </div>
  );
};

export default Collection;