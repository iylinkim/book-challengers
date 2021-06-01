import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "components/Challenge/challenge.module.css";
import { toggleClassName } from "utils";

const Challenge = ({ title, info, darkTheme }) => {
  const [progress, setProgress] = useState({});
  const history = useHistory();

  const goToTracker = () => {
    history.push({
      pathname: "/tracker",
      title,
      state: info,
    });
  };

  useEffect(() => {
    if (!info.books) {
      setProgress({
        totalBookCount: 0,
      });
    } else {
      setProgress({
        totalBookCount: Object.keys(info.books).length,
      });
    }
  }, [info.books]);

  const currentProgress = Math.floor(
    (progress.totalBookCount / info.goal.bookGoal) * 100
  );

  return (
    <li
      onClick={goToTracker}
      className={
        history.location.pathname === "/"
          ? `${styles.home}`
          : `${styles.profile}`
      }
    >
      <p className={toggleClassName(darkTheme, styles, "title")}>{title}</p>
      {history.location.pathname === "/profile" && (
        <div className={styles.progressWrap}>
          <div className={styles.progress}>
            <p
              className={styles.progressBar}
              style={{ width: `${currentProgress}%` }}
            ></p>
          </div>
          <span
            className={toggleClassName(darkTheme, styles, "start", "barNum")}
          >
            0
          </span>
          <span
            className={toggleClassName(darkTheme, styles, "done", "barNum")}
          >
            {info.goal.bookGoal} books
          </span>
          <span className={styles.current}>
            {currentProgress < 100 ? `${currentProgress}%` : "Done!"}
          </span>
        </div>
      )}
    </li>
  );
};

export default Challenge;
