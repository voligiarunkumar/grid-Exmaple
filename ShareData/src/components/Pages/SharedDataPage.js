import React,{useState} from "react";

import SideNavBar from "../SidebarNavbar/SideNavBar.jsx";
import  Customer from '../Customer/Customer'
import WelcomePage from '../WelcomeSharedData/WelcomeSharedData';
const ShareddataPage=()=>{
  const [route, setRoute] = useState("null");

    const navigationClicked = (url) => {
        setRoute(url)
      };
      const component = (url) => {
        if (url == "/Customer") {
          return (
              <Customer />
          );
          }
        else{
            return (
                <WelcomePage/>
            )
        }

      };
    return(
   <>
   <SideNavBar navigationClicked={navigationClicked}/>
   {component(route)}
   </>
    )
}
export default ShareddataPage