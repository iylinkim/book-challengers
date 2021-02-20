import React from "react";
import styles from "components/Header/header.module.css";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Header = ({ userObj }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <i className="fas fa-book"></i>
          <span>Book Challengers</span>
        </h1>
        {userObj && (
          <p className={styles.userName}>Hello {userObj.displayName}</p>
        )}
        <button className={styles.addBtn}>+</button>
        <button className={styles.userPage}>My page</button>
      </header>
    </>
  );
};

export default Header;
