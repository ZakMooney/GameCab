import React from 'react';
import { NavLink } from "react-router-dom";

import Typography from './Typography';

const NavButton = (props) => {
  const {linkTo, linkIcon, linkText} = props;

  return (
    <NavLink
      to={linkTo || '/'}
      className={({ isActive }) =>
        `rounded-md py-3 px-4 sm:px-6 nav-link flex flex-row items-center align-center leading-8 transition-all ${isActive ? (
          'active bg-gray-100 hover:bg-gray-200 dark:bg-gray-850 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-600'
        ) : (
          'bg-gray-50 hover:bg-gray-200 dark:bg-gray-750 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200'
        )}`
      }
    >
      {linkIcon ? (
        <span className="mr-3">
          {linkIcon}
        </span>
      ) : (
        null
      )}
      <Typography
        variant="body"
      >
        {linkText || ''}
      </Typography>
    </NavLink>
  );
}

export default NavButton;
