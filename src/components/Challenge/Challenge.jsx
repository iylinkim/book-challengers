import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "components/Challenge/challenge.module.css";

const Challenge = ({ title, info }) => {
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
  }, []);

  const currentProgress = Math.floor(
    (progress.totalBookCount / info.goal.bookGoal) * 100
  );

  return (
    <li onClick={goToTracker}>
      {title}
      {history.location.pathname === "/profile" && (
        <div className={styles.progressWrap}>
          <div className={styles.progress}>
            <p
              className={styles.progressBar}
              style={{ width: `${currentProgress}%` }}
            ></p>
          </div>
            <span className={`${styles.start} ${styles.barNum}`}>0</span>
            <span className={`${styles.done} ${styles.barNum}`}>
              {info.goal.bookGoal}
            </span>
            <span className={styles.current}>{currentProgress < 100 ? `${currentProgress}%` : "DONE!"}</span>
        </div>
      )}
    </li>
  );
};

export default Challenge;
