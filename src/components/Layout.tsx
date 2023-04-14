import Link from 'next/link';
import React from 'react';
import Footer from './Footer/Footer';

interface Props {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
    <div className="page">
      <Link href="/">
        <div className="logo">
          <img src="/logo.png" alt="log" />
        </div>
      </Link>
      {children}
    </div>
    <Footer />

    </>
  );
};

export default Layout;