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

const Footer = ({links}) => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <footer className="flex justify-center transition-all duration-200 shadow-sm py-2 md:py-4 z-50 relative">
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
            {links.map((item, index) => {
              return (
                <Fragment key={index}>
                  {index > 0 && (
                    <Typography
                      variant="caption"
                      align="right"
                      color="muted"
                      className="mx-2 pointer-events-none"
                    >
                      •
                    </Typography>                    
                  )}
                  <Typography
                    variant="caption"
                    align="right"
                    onClick={() => navigate(item.link)}
                    className="cursor-pointer hover:brightness-140 transition-all duration-200"
                  >
                    {item.name}
                  </Typography>  
                </Fragment>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );

};

export default Footer;
