import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import "./app.css";

function App({book}) {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouter loggedIn={loggedIn} book={book}/> : "Initializing..."}</>;
}

export default App;
