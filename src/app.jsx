import AppRouter from "components/Router/Router";
import Challenges from "components/Challenges/Challenges";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import "./app.css";

function App({ImageInput, book }) {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  const ChallengeList = (props) => <Challenges {...props} userObj={userObj} />;

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [loggedIn, userObj]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
        ImageInput={ImageInput}
          loggedIn={loggedIn}
          book={book}
          userObj={userObj}
          setLoggedIn={setLoggedIn}
          ChallengeList={ChallengeList}
          refreshUser={refreshUser}
        />
      ) : (
        <div className="loading">
          <p className="spinner">
            <i className="fas fa-spinner"></i>
          </p>
          <p className="loading_text">Loading...</p>
        </div>
      )}
    </>
  );
}

export default App;
