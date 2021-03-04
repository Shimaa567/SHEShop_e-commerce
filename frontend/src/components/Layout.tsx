import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
