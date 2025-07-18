import { useState, Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Menu,
} from 'lucide-react';

import GameCabnetLogo from '../../assets/gamecabnet_logo.svg?react';

import ThemeToggle from "./ThemeToggle";
import Button from './Button';

const TopNav = ({links}) => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav
        className={`flex items-center justify-between w-full relative z-50 ${navOpen && 'bg-bg-content dark:bg-bg-content-dark'}`}
      >
        <div
          className={`flex items-center justify-between w-full relative gc-container`}
        >
          <div className="flex justify-between items-center w-full md:w-auto">
            <Button
              onClick={() => setNavOpen(!navOpen)}
              variant="ghost"
              icon={
                <Menu className="w-6 h-6" />
              }
              className="md:hidden"
            />

            <div className="flex">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="xxs"
              >
                <GameCabnetLogo className="transition-all duration-200 text-gray-900 dark:text-white max-h-[32px] md:max-h-[42px]"/>
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <ThemeToggle />
            </div>

          </div>

          <div className="hidden md:flex gap-4 w-full justify-end mr-4">
            {links.map((item, index) => {
              return (
                <Button
                  key={index}
                  icon={item.icon}
                  onClick={() => navigate(item.link)}
                  variant={
                    location.pathname == item.link ? (
                      'ghostActive'
                    ) : (
                      'ghost'
                    )
                  }
                  className="group"
                >
                  {item.name}
                </Button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div
        className={
          navOpen
            ? "md:hidden fixed top-16 left-0 right-0 z-40 p-4 opacity-100 transition-all duration-200 ease-in-out bg-bg-content dark:bg-bg-content-dark"
            : "md:hidden fixed top-0 left-0 right-0 z-40 p-4 transform -translate-y-full opacity-0 transition-all duration-200 ease-in-out bg-bg-content dark:bg-bg-content-dark"
        }
      >
        <div className="flex flex-col gap-4">
          {links.map((item, index) => {
            return (
              <Button
                key={index}
                icon={item.icon}
                onClick={() => navigate(item.link)}
                variant={
                  location.pathname == item.link ? (
                    'ghostActive'
                  ) : (
                    'ghost'
                  )
                }
                className="w-full group"
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setNavOpen(false)}
        className={
          navOpen
            ? "z-20 fixed inset-0 bg-slate-500/40 dark:bg-slate-900/40 transition-all duration-200 ease-in-out backdrop-blur-xs"
            : "z-20 hidden bg-slate-500/10 dark:bg-slate-900/10 transition-all duration-200 ease-in-out backdrop-blur-none"
        }  
      />
    </>
  );

};

export default TopNav;
