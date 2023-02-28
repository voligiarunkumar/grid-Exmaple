import React, { Suspense, useState, useEffect } from "react";
import "./App.scss";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage"
import ErrorBoundary from "./error/ErrorBoundary"
const Vtrack = React.lazy(() => import("Vtrac/Vtrack"));
const Shipping=React.lazy(()=>import("Shipping/ShippingDataPage"))
const SharedData=React.lazy(()=>import("SharedData/SharedDataPage"))
//const Documents=React.lazy(()=>import("Documents/DocumentPage"))





const App = () => {
  const [route, setRoute] = useState("null");
  const history = useHistory();
  const location = useLocation();

  const navigationClicked = (url) => {
    if (url == "/") {
      history.push("/");
      localStorage.setItem("url", url);
      setRoute(url);
    } else {
      setRoute(url);
      localStorage.setItem("url", url);
      history.push("/Vtrac");
    }
  };
  useEffect(() => {
    if (route == "null") {
      const url = localStorage.getItem("url");
      setRoute(url);
    }
  }, []);
  return (
    <>
      <Switch>
      <Route path="/" strict exact>
            <HomePage/>
        </Route>
        <Route path="/Vtrack" strict exact>
        <ErrorBoundary fallback={<h2>Vtrac can't be loaded 404</h2>}>
          <Suspense fallback={"loading"}>
            <Vtrack/>
          </Suspense>
          </ErrorBoundary>
        </Route>
        <Route path="/Shipping" strict exact>
        <ErrorBoundary fallback={<h2>Shipping can't be loaded 404</h2>}>
          <Suspense fallback={"loading"}>
          <Shipping/>
          </Suspense>
          </ErrorBoundary>
        </Route>
        <Route path="/SharedData" strict exact>
          <ErrorBoundary fallback={<h2>SharedData can't be loaded 404</h2>}>
          <Suspense fallback={"loading"}>
          <SharedData/>
          </Suspense>
          </ErrorBoundary>
        </Route>
        {/*
        <Route path="/Documents" strict exact>
        <ErrorBoundary fallback={<h2>Documents can't be loaded 404</h2>}>
          <Suspense fallback={"loading"}>
          <Documents/>
          </Suspense>
          </ErrorBoundary>
        </Route>
*/}
      </Switch>
    </>
  );
};

export default App;
