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
  const [showHeading,setShowHeading]=useState(false)
  const [shouldHeadingRemoved,setHeadingReamoved]=useState(false)
  const onClickActive = (i) => {
    setActiveIndex(i);
    setHeadingReamoved(true)

  };
  const OnClickDashboard = (i) => {
    setActiveIndex(i);
    props.navigationClicked("/");
  };
 
  useEffect(() => {
    setMenu(menu);
  }, [menu]);
  const onClickRemoveHeading=()=>{
    if(!shouldHeadingRemoved){
    setShowHeading(false)
    }
    if(activeIndex=="-1"){
      setShowHeading(true)
    }
    setActiveIndex("-1");
  }
  const onClickAddHeading=()=>{
    setShowHeading(true)

  }
  return (
    <div>
      <div className="wrapper">
        
        <div className="sidebar" style={{width:showHeading?"200px":"90px"}}  onMouseEnter={()=> onClickAddHeading()} >
          <ul>
          <li className="No-Hover" onClick={() => props.navigationClicked("/")}>
                         <i className="material-icons"style={{fontSize:"30px"}}>&#xe5c3; <span style={{fontSize:"16px",position:"relative",bottom:"9px"}}> {showHeading?"DashBord":""}</span>
                        {showHeading? <i onClick={()=>{setShowHeading(false)
                          setActiveIndex("-1");
                        
                        }} className="material-icons" style={{"font-size":"25px",color:"black",position:"relative",bottom:"2px",fontWeight:400}}>close</i>
                        :null
                        }
                         
                         </i>
                      
                        </li>
            {menu && menu.length && menu.length > 0
              ? menu.map((item, i) => {
                  if (i == activeIndex && item.SubMenu&&showHeading) {
                    return (
                      <li key={i} onClick={() => onClickActive(i)}>
                        <div style={{ width: "100%" }}>
                          {
                            <div
                              className="active-class"
                              style={{
                                width: "100%",
                                height: "50px",
                                padding: "15px",
                              }}
                            >
                              <i className={item.icon} ></i>
                              <span>{showHeading?item.heading:""}</span>
                            </div>
                          }
                          <ul>
                            {item.SubMenu &&
                            item.SubMenu.length &&
                            item.SubMenu.length > 0
                              ? item.SubMenu.map((sub, j) => {
                                  return (
                                    <li
                                      key={j}
                                      style={{
                                        background: "#bdb8d7",
                                        marginTop: "2px",
                                        marginBottom: "2px",
                                        padding: "15px",
                                        height: "30px",
                                        fontSize: "12px",
                                        textAlign: "left",
                                        fontWeight: "400",
                                      }}
                                      onClick={() => navigationClicked(sub.url)}
                                    >
                                      {sub.heading}
                                    </li>
                                  );
                                })
                              : null}
                          </ul>
                        </div>
                      </li>
                    );
                  } else if (i == activeIndex) {
                    
                    
                      return (
                        <li
                          key={i}
                          className="active-class"
                          onClick={() => onClickActive(i)}
                        >
                          <i className={item.icon} />
                          <span>{showHeading?item.heading:""}</span>
                        </li>
                      );
                    
                  } else {
                    return (
                      <li key={i} onClick={() => onClickActive(i)}>
                        <i className={item.icon} />
                        <span>{showHeading?item.heading:""}</span>
                      </li>
                    );
                  }
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SideNavBar;
