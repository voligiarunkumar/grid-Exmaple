import React, { useEffect, useState } from "react";
import "./SideNavBar.css";

const SideNavBar = (props) => {
  const [menu, setMenu] = useState([
    {
      heading: "Shared Data",
      icon: "fas fa-user-friends",
      SubMenu: [{ heading: "Customer", url: "/Customer" }],
    },
  ]);
  const navigationClicked = (url) => {
    props.navigationClicked(url);
  };
  const [activeIndex, setActiveIndex] = useState("-1");
  const [showHeading, setShowHeading] = useState(false);
  const [shouldHeadingRemoved, setHeadingReamoved] = useState(false);
  const onClickActive = (i) => {
    setActiveIndex(i);
    setHeadingReamoved(true);
  };
  // const OnClickDashboard = (i) => {
  //   setActiveIndex(i);
  //   props.navigationClicked("/");
  // };

  useEffect(() => {
    setMenu(menu);
  }, [menu]);
  const onClickRemoveHeading = () => {
    if (!shouldHeadingRemoved) {
      setShowHeading(false);
    }
    if (activeIndex == "-1") {
      setShowHeading(true);
    }
    setActiveIndex("-1");
  };
  const onClickAddHeading = () => {
    setShowHeading(true);
  };
  return (
    <div>
      <div className="wrapper">
        <div
          className="sidebar"
          style={{ width: showHeading ? "200px" : "90px" }}
          onMouseEnter={() => onClickAddHeading()}
        >
          <ul>
            <li
              className="No-Hover"
              onClick={() => props.navigationClicked("/")}
            >
              <i className="material-icons" style={{ fontSize: "30px" }}>
                &#xe5c3;{" "}
                <span
                  style={{
                    fontSize: "16px",
                    position: "relative",
                    bottom: "9px",
                  }}
                >
                  {" "}
                  {showHeading ? "DashBord" : ""}
                </span>
                {showHeading ? (
                  <i
                    onClick={() => {
                      setShowHeading(false);
                      setActiveIndex("-1");
                    }}
                    className="material-icons"
                    style={{
                      "font-size": "25px",
                      color: "black",
                      position: "relative",
                      bottom: "2px",
                      fontWeight: 400,
                    }}
                  >
                    close
                  </i>
                ) : null}
              </i>
            </li>
            <li onClick={() => props.handleNavigation("/Vtrack")}>
              <i className={"fa fa-bar-chart"} />
              <span>{showHeading ? "Vtrack" : ""}</span>
            </li>
            <li onClick={() => props.handleNavigation("/Shipping")}>
              <i className={"fas fa-truck"} />
              <span>{showHeading ? "Shipping" : ""}</span>
            </li>
            <li onClick={() => props.handleNavigation("/SharedData")}>
              <i className={"fas fa-user-friends"} />
              <span>{showHeading ? "SharedData" : ""}</span>
            </li>
            <li onClick={() => props.handleNavigation("/Documents")}>
              <i className={"fa fa-file"} />
              <span>{showHeading ? "Documents" : ""}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SideNavBar;
