import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = (props) => {
  return (
    <div className="w-full h-full max-w-[96rem] my-0 mx-auto">
      {/* Top Nav Placeholder */}
      <div className="flex flex-col md:flex-row">
        {/*  */}
        <main role="main" className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;