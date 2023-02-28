import React, { Suspense } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import SideNavBar from "../SidebarNavbar/SideNavBar.jsx";

import { NavLink } from "react-router-dom";
import "./HomePage.css";
const HomePage = (props) => {
  const history = useHistory();

  const handleNavigation = (url) => {
    history.push(url);
  };

  return (
    <>
      <SideNavBar handleNavigation={handleNavigation} />
    </>
  );
};
export default HomePage;
