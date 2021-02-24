import React from "react";
import styles from "components/Navigation/navigation.module.css";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";

const Navigation = ({ setLoggedIn }) => {
  const history = useHistory();
  const onClick = (event) => {
    const {
      target: { innerText },
    } = event;

    if (innerText === "Home") {
      history.push("/");
    } else if (innerText === "Profile") {
      history.push("/profile");
    } else if (innerText === "Sign out") {
      authService.signOut();
      setLoggedIn(false);
      history.push("/");
    }
  };
  return (
    <ul>
      <li onClick={onClick}>Home</li>
      <li onClick={onClick}>Profile</li>
      <li onClick={onClick}>Sign out</li>
    </ul>
  );
};

export default Navigation;
