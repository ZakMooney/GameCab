import React, { useState } from 'react';
import { Heart } from 'lucide-react';

import { useFavourites } from '../stores/FavouritesStore';

import HeroImg from '../assets/hero.webp';

import GameSearch from "../components/Home/GameSearch";
import FavouritesDisplay from "../components/Home/FavouritesDisplay";
import FavouritesStats from "../components/Home/FavouritesStats";

import Typography from "../components/ui/Typography";
import Card from "../components/ui/Card";

const Home = () => {
  return (
    <>
      <section
        style={{backgroundImage: `url(${HeroImg})`}}
        className="relative h-[12rem] md:h-[20rem] bg-gradient-to-br from-blue-600 to-purple-700 bg-center bg-cover flex items-center justify-center"
      />

      <section className="px-4 md:px-8 max-w-[96rem] m-auto">
        <GameSearch />
      </section>
    </>
  );
};

export default Home;