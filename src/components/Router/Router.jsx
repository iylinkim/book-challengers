import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../Auth/Auth";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tracker from "../Tracker/Tracker";
import Profile from "components/Profile/Profile";
import styles from "components/Router/router.module.css";
import Navigation from "components/Navigation/Navigation";

const AppRouter = ({
  ChallengeList,
  ImageInput,
  ToggleBtn,
  loggedIn,
  book,
  userObj,
  setLoggedIn,
  refreshUser,
}) => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={styles.wrap}>
      <Header
        userObj={userObj}
        setLoggedIn={setLoggedIn}
        darkTheme={darkTheme}
      />
      <ToggleBtn darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Router>
        {loggedIn && (
          <Navigation setLoggedIn={setLoggedIn} darkTheme={darkTheme} />
        )}
        <section className={styles.section}>
          <Switch>
            {loggedIn && userObj ? (
              <>
                <Route exact path="/">
                  <Home
                    userObj={userObj}
                    loggedIn={loggedIn}
                    darkTheme={darkTheme}
                  />
                </Route>
                <Route exact path="/tracker">
                  <Tracker
                    book={book}
                    userObj={userObj}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    darkTheme={darkTheme}
                  />
                </Route>
                <Route exact path="/profile">
                  <Profile
                    ImageInput={ImageInput}
                    userObj={userObj}
                    loggedIn={loggedIn}
                    ChallengeList={ChallengeList}
                    refreshUser={refreshUser}
                    darkTheme={darkTheme}
                  />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Auth darkTheme={darkTheme} />
                </Route>
              </>
            )}
          </Switch>
        </section>
      </Router>
      <Footer darkTheme={darkTheme} />
    </div>
  );
};

export default AppRouter;
