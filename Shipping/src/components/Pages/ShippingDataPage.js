import React,{useState} from "react";
import ReceivedShipment from '../RecievedShipment/RecievedShipment';
import ViewShipment from '../ViewShipment/ViewShipment';
import WelcomePage from '../WelcomeShippingData/WelcomeShippingData';
import SideNavBar from '../SidebarNavbar/SideNavBar.jsx';
const ShippingData=()=>{
  const [route, setRoute] = useState("null");

    const navigationClicked = (url) => {
        setRoute(url)
      };
      const component = (url) => {
        if (url == "/RecievedShipment") {
          return (
              <ReceivedShipment />
          );
          }
        if (url == "/ViewShipment") {
          return (
              <ViewShipment />
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
export default ShippingData