import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/auth/Login";
import Layout from "./layouts/Layout";
import $ from "jquery";
import { getCookie } from "./utils/cookieUtil";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  useEffect(() => {
    window.addEventListener("scroll", function () {
      var scrollDistance = $(this).scrollTop();
      if ((scrollDistance as number) > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });
  }, []);
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    // </Suspense>

    <Router>
      <Switch>
        <Route
          path="/login"
          render={(props) => {
            return getCookie("tk") ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            ) : (
              <Login />
            );
          }}
        ></Route>
        <Route
          path="/"
          render={(props) => {
            return <Layout {...props} />;
          }}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
