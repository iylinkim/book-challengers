import AppRouter from "components/Router/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import "./app.css";

function App({ book }) {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

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
  return (
    <>
      {init ? (
        <AppRouter loggedIn={loggedIn} book={book} userObj={userObj} setLoggedIn={setLoggedIn}/>
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
