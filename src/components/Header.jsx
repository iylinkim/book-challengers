import React from "react";
import styles from "components/header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <i className="fas fa-book"></i>
          <span>Book Challengers</span>
        </h1>
      </header>
      <p className={styles.main}><img src="main.jpg" alt="book"/></p>
    </>
  );
};

export default Header;
