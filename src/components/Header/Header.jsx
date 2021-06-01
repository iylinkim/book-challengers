import React from "react";
import styles from "components/Header/header.module.css";
import { toggleClassName } from "utils";

const Header = ({ userObj, darkTheme }) => {
  return (
    <>
      <header className={toggleClassName(darkTheme, styles, "header")}>
        <h1>
          <i className="fas fa-book"></i>
          <span>Book Challengers</span>
        </h1>
        {userObj && (
          <div className={styles.user}>
            <p className={styles.userProfile}>
              <img src={userObj.photoURL} alt={`${userObj.displayName}`} />
            </p>
            <span>{userObj.displayName}</span>
          </div>
        )}
      </header>
      {userObj && (
        <p className={styles.main}>
          <img src="/book-challengers/images/main.jpg" alt="book" />
        </p>
      )}
    </>
  );
};

export default Header;
