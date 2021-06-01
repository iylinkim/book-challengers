import React, { useEffect, useState } from "react";
import styles from "components/Theme/theme.module.css";
import { toggleClassName } from "utils";

const Theme = ({ darkTheme, setDarkTheme }) => {
  const DARK = "dark";

  const handleTheme = (isDark) => {
    const html = document.querySelector("html");

    if (isDark) {
      html.classList.add(DARK);
      localStorage.setItem(DARK, true);
    } else {
      html.classList.remove(DARK);
      localStorage.setItem(DARK, false);
    }
  };

  const onClick = (e) => {
    setDarkTheme((prev) => {
      handleTheme(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    let ls_theme = JSON.parse(localStorage.getItem(DARK));

    if (ls_theme !== null) {
      //localStorage에 theme이 저장되어 있을 때
      setDarkTheme(ls_theme);
      handleTheme(ls_theme);
    } else {
      //localStorage가 비어있을 때
      console.log("localStorage 비어있음");

      const darkMode = window.matchMedia(
        "(prefers-color-scheme: Dark)"
      ).matches;
      setDarkTheme(darkMode);
      handleTheme(darkMode);
    }
  }, []);
  return (
    <div className={styles.wrap} onClick={onClick}>
      <div className={toggleClassName(darkTheme, styles, "toggle")}>
        {darkTheme ? "Dark" : "Light"}
      </div>
      <div className={toggleClassName(darkTheme, styles, "names")}>
        <p className={styles.lightText}>Light</p>
        <p className={styles.darkText}>Dark</p>
      </div>
    </div>
  );
};

export default Theme;
