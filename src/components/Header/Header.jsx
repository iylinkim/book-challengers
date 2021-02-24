import React from "react";
import styles from "components/Header/header.module.css";

const Header = ({ userObj }) => {

  return (
    <>
      <header className={styles.header}>
        <h1>
          <i className="fas fa-book"></i>
          <span>Book Challengers</span>
        </h1>
        {userObj && (
          <p className={styles.userProfile}>
            <img src={userObj.photoURL} alt={`${userObj.displayName}`}/>
          </p>
        )}
      </header>
    </>
  );
};

export default Header;
