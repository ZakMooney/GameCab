import { useState, useEffect } from 'react';

const loadingMessages = [
  "Compiling pixels",
  "Patching plot holes",
  "Installing additional pylons",
  "Buffering boss fights",
  "Calibrating difficulty curve",
  "Rolling for initiative",
  "Gathering your party",
  "Checking for side quests",
  "Consulting the strategy guide",
  "Waiting for the day-one patch",
  "Farming for rare drops",
  "Grinding experience points",
  "Unlocking achievements",
  "Blowing on cartridges",
  "Untangling controller cables",
  "Teaching pixels to dance",
  "Herding digital cats",
  "Convincing games to behave",
  "Bribing the search algorithm",
  "Asking nicely for results",
];

export const useRandomLoadingMessage = () => {
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const getRandomLoadingMessage = () => {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex] + '...';
  };
  
  useEffect(() => {
    setLoadingMessage(getRandomLoadingMessage());
  }, []);
  
  const refreshLoadingMessage = () => {
    setLoadingMessage(getRandomLoadingMessage());
  };
  
  return { loadingMessage, refreshLoadingMessage };
};