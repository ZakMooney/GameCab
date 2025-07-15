import React from 'react';

import HeroImg from '../assets/hero.webp';

import GameSearch from "../components/Home/GameSearch";

const Home = () => {
  return (
    <>
      <section
        style={{backgroundImage: `url(${HeroImg})`}}
        className="relative h-[12rem] md:h-[20rem] bg-gradient-to-br from-blue-600 to-purple-700 bg-center bg-cover flex items-center justify-center"
      />

      <section className="px-4 max-w-[96rem] m-auto">
        <GameSearch />
      </section>
    </>
  );
};

export default Home;