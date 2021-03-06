import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Challenge from "../Challenge/Challenge";
import styles from "components/Challenges/challenges.module.css";

const Challenges = ({ userObj, darkTheme }) => {
  const [challenges, setChallenges] = useState({});

  useEffect(() => {
    const ref = dbService.ref(`${userObj.uid}`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && setChallenges(value);
    });
  }, [userObj.uid]);

  return (
    <ul className={styles.challenges}>
      {challenges
        ? Object.keys(challenges).map((key) => {
            return (
              <Challenge
                key={key}
                title={key}
                info={challenges[key]}
                darkTheme={darkTheme}
              />
            );
          })
        : "There is no challenges yet. Set your goal!"}
    </ul>
  );
};

export default Challenges;
