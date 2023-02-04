import React, { useState } from 'react';
import Footer from '../footer/Footer.component';
import Header from '../header/Header.component';
import SideBar from '../sidebar/SideBar.component';

const Layout = ({ children }) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  
  const onToggleHandler = () => {
    setToggleCollapse(!toggleCollapse);
  };
  return (
    <>
      <Header toggleHandler={onToggleHandler} />
      <SideBar toggleCollapse={toggleCollapse} searchProductRoute={true}>
        {children}
      </SideBar>
      <Footer />
    </>
  );
};

export default Layout;
