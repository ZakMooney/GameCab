import React, {useEffect} from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  Search,
  Crown
} from 'lucide-react';

import TopNav from "./TopNav";
import Footer from "./Footer";

const iconBase = "w-6 h-6 transition-all duration-200";

const NavLinks = [
  {
    name: "Search",
    link: "/",
    icon: <Search className={`${iconBase} group-hover:text-sky-500 group-hover:dark:text-sky-300`} />,
  },
  {
    name: "Collection",
    link: "/collection",
    icon: <Crown className={`${iconBase} group-hover:text-orange-500 group-hover:dark:text-orange-300`} />,
  },
];

const FooterLinks = [
  {
    name: "Search",
    link: "/",
  },
  {
    name: "Collection",
    link: "/collection",
  },
  {
    name: "Roadmap",
    link: "/roadmap",
  },
];

const Layout = (props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full h-full my-0 mx-auto">
      <div className="flex flex-col m-auto min-h-screen">
        <TopNav links={NavLinks} />
        <main role="main" className="flex-1 mb-20">
          <Outlet />
        </main>
        <Footer links={FooterLinks} />
      </div>
    </div>
  );
}

export default Layout;