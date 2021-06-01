import React from "react";
import styles from "components/Navigation/navigation.module.css";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";
import { toggleClassName } from "utils";

const Navigation = ({ setLoggedIn, darkTheme }) => {
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
    <ul className={toggleClassName(darkTheme, styles, "nav")}>
      <li className={styles.menu} onClick={onClick}>
        Home
      </li>
      <li className={styles.menu} onClick={onClick}>
        Profile
      </li>
      <li className={styles.menu} onClick={onClick}>
        Sign out
      </li>
    </ul>
  );
};

export default Navigation;
