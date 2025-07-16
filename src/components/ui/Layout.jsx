import React from 'react';
import { Outlet } from 'react-router-dom';

import {
  Search,
  Crown
} from 'lucide-react';

import TopNav from "./TopNav";
import Footer from "./Footer";

const NavLinks = [
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

const Layout = (props) => {
  return (
    <div className="w-full h-full my-0 mx-auto">
      <TopNav links={NavLinks} />
      <div className="flex flex-col md:flex-row m-auto">
        <main role="main" className="flex-1 mb-20">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;