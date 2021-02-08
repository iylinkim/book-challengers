import React from "react";
import styles from "components/header.module.css";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Header = () => {
  const onClick = () => {
    // window.confirm('Are you sure want to log out?');
    authService.signOut();
  };
  return (
    <>
      <header className={styles.header}>
        <h1>
          <i className="fas fa-book"></i>
          <span>Book Challengers</span>
        </h1>
        {/* <button onClick={onClick} className={styles.logout}>
          Log out
        </button> */}
      </header>
    </>
  );
};

export default Header;
