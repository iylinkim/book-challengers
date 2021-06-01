import React from "react";
import styles from "components/Footer/footer.module.css";
import { toggleClassName } from "utils";

const Footer = ({ darkTheme }) => {
  return (
    <footer className={toggleClassName(darkTheme, styles, "footer")}>
      &copy; {new Date().getFullYear()} Iylin Kim. All rights reserved.
    </footer>
  );
};

export default Footer;
