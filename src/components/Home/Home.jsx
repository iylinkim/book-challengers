import React, { useState } from "react";
import { dbService } from "fbase";
import styles from "components/Home/home.module.css";
import Challenges from "../Challenges/Challenges";

const Home = ({ userObj, darkTheme }) => {
  const [goal, setGoal] = useState(0);
  const [title, setTitle] = useState("");

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "goal") {
      setGoal(value);
    } else if (name === "title") {
      setTitle(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.ref(`${userObj.uid}/${title}/goal`).set({
      bookGoal: goal,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Set your goal</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={darkTheme ? `${styles.dark} ${styles.input}` : styles.input}
          onChange={onChange}
          type="number"
          value={goal}
          name="goal"
          min="10"
          max="100"
          step="10"
        />
        <span>books</span>
        <p>
          <input
            className={darkTheme ? `${styles.dark} ${styles.input} ${styles.titleInput}` : `${styles.input} ${styles.titleInput}`}
            onChange={onChange}
            type="text"
            value={title}
            name="title"
            placeholder="Enter your challenge title"
          />
        </p>
        <p className={styles.submit}>
          <input type="submit" value="start" />
        </p>
      </form>
      <Challenges userObj={userObj} />
    </div>
  );
};

export default Home;
