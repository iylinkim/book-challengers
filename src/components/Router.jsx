import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Tracker from "./Tracker";
import styles from 'components/router.module.css';

const AppRouter = ({ loggedIn, book }) => {
  return (
    <div className={styles.wrap}>
      <Header />
      <section className={styles.section}>
        <Router>
          <Switch>
            {loggedIn ? (
              <>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/tracker">
                  <Tracker book={book} />
                </Route>
                {/* <Route exact path="/book_list">
                <Book_list book={book}/>
              </Route> */}
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
      </section>
      <Footer />
    </div>
  );
};

export default AppRouter;
