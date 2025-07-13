import React from 'react';
import { Outlet } from 'react-router-dom';

import TopNav from "./TopNav";

const Layout = (props) => {
  return (
    <div className="w-full h-full my-0 mx-auto">
      <TopNav />
      <div className="flex flex-col md:flex-row max-w-[96rem] m-auto">
        <main role="main" className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;