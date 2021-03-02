import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from "../Auth/Auth";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tracker from "../Tracker/Tracker";
import Profile from "components/Profile/Profile";
import styles from "components/Router/router.module.css";
import Navigation from "components/Navigation/Navigation";

function AppRouter({
  ImageInput,
  loggedIn,
  book,
  userObj,
  setLoggedIn,
  ChallengeList,
  refreshUser,
}) {
  return (
    <div className={styles.wrap}>
      <Header userObj={userObj} setLoggedIn={setLoggedIn} />
      <Router>
        {loggedIn && <Navigation setLoggedIn={setLoggedIn} />}
        <section className={styles.section}>
          <Switch>
            {loggedIn && userObj ? (
              <>
                <Route exact path="/">
                  <Home userObj={userObj} loggedIn={loggedIn} />
                </Route>
                <Route exact path="/tracker">
                  <Tracker
                    book={book}
                    userObj={userObj}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                </Route>
                <Route exact path="/profile">
                  <Profile
                    ImageInput={ImageInput}
                    userObj={userObj}
                    loggedIn={loggedIn}
                    ChallengeList={ChallengeList}
                    refreshUser={refreshUser}
                  />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Auth loggedIn={loggedIn} />
                </Route>
              </>
            )}
          </Switch>
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default AppRouter;
