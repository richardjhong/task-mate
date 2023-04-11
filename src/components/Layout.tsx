import Link from 'next/link';
import React from 'react';

interface Props {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="page">
      <Link href="/">
        <div className="logo">
          <img src="/logo.png" alt="log" />
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Layout;