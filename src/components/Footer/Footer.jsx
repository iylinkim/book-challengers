import React from "react";
import styles from "components/Footer/footer.module.css";

const Footer = ({ darkTheme }) => {
  return (
    <footer
      className={
        darkTheme ? `${styles.dark} ${styles.footer}` : `${styles.footer}`
      }
    >
      &copy; {new Date().getFullYear()} Iylin Kim. All rights reserved.
    </footer>
  );
};

export default Footer;
