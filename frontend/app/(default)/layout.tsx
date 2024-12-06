
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import React, { Fragment, ReactNode } from 'react';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Fragment>
          <Navbar/>
          {children}
          <Footer/>
        </Fragment>
    );
};

export default Layout;
