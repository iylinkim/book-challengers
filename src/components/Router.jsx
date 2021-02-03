import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Tracker from "./Tracker";

const AppRouter = ({ loggedIn, book }) => {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          {loggedIn ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/tracker">
                <Tracker book={book}/>
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </Switch>
      </Router>
      <Footer />
    </>
  );
};

export default AppRouter;
