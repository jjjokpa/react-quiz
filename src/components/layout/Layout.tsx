import React, { ReactChild, ReactElement, ReactHTMLElement, ReactNode } from 'react'
import MainNavigation from './MainNavigation';

type Props = {
  children: React.ReactNode,
};

function Layout(props:Props) {
  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
