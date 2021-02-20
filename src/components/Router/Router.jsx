import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../Auth/Auth";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tracker from "../Tracker/Tracker";
import styles from 'components/Router/router.module.css';

const AppRouter = ({ loggedIn, book, userObj,setLoggedIn }) => {
  console.log("router: "+loggedIn);

  return (
    <div className={styles.wrap}>
      <Header userObj={userObj}/>
      <section className={styles.section}>
        <Router>
          <Switch>
            {loggedIn && userObj ? (
              <>
                <Route exact path="/">
                  <Home userObj={userObj} loggedIn={loggedIn}/>
                </Route>
                <Route exact path="/tracker">
                  <Tracker book={book} userObj={userObj} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                </Route>
                {/* <Route exact path="/book_list">
                <Book_list book={book}/>
              </Route> */}
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Auth loggedIn={loggedIn}/>
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
