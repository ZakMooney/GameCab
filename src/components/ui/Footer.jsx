import { useState, Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Menu,
  Search,
  Crown
} from 'lucide-react';

import GameCabnetLogo from '../../assets/gamecabnet_logo.svg?react';

import ThemeToggle from "./ThemeToggle";
import NavButton from './NavButton';
import Button from './Button';
import Typography from './Typography';

const Footer = ({}) => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      name: "Search",
      link: "/",
      icon: <Search className="w-6 h-6" />,
    },
    {
      name: "Collection",
      link: "/collection",
      icon: <Crown className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <footer className="flex justify-center transition-all duration-200 bg-bg-content dark:bg-bg-content-dark border border-card-border dark:border-card-border-dark shadow-sm py-2 md:py-4 z-50 relative">
        <div className="flex items-center justify-between w-full max-w-[96rem] px-4">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Button
              onClick={() => setNavOpen(!navOpen)}
              variant="secondary"
              icon={
                <Menu className="w-6 h-6" />
              }
              type="outline-icon"
              className="md:hidden"
            />

            <div className="flex flex-col">
              <GameCabnetLogo className="transition-all duration-200 text-gray-900 dark:text-white max-h-[24px]"/>
              <Typography
                variant="caption"
                align="left"
                color="muted"
                className="mt-1"
              >
                Powered by <a href="https://www.igdb.com/" target="_blank">IGDB</a>
              </Typography>
            </div>

            <div className="flex p-6 md:hidden"></div>

          </div>

          <div className="hidden md:flex items-center">
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </footer>
    </>
  );

};

export default Footer;
