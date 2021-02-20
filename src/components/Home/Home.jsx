import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { dbService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import styles from "components/Home/home.module.css";

const Home = ({ userObj, loggedIn }) => {
  const history = useHistory();
  const [goal, setGoal] = useState(0);
  const [dbGoal, setDbGoal] = useState();
  const [saving, setSaving] = useState(true);
  const [challenge, setChallenge] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setGoal(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.ref(`${userObj.uid}/goal`).set({
      bookGoal: goal,
    });
    setChallenge(uuidv4());
  };
  console.log(challenge);
  const getBookGoal = async () => {
    const ref = dbService.ref(`${userObj.uid}/goal`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && setDbGoal(value);
    });
  };
  // console.log('home loggedIn: '+loggedIn);
  const goToTracker = () => {
    if (dbGoal && loggedIn) {
      history.push({
        pathname: "/tracker",
        state: setDbGoal()
      });
    }else if(!loggedIn){
      history.push("/");
    }
  };
  useEffect(() => {
    if (saving === false) {
      console.log("go to tracker");
      goToTracker();
    } else {
      console.log("get book goal");
      getBookGoal();
      setSaving(() => false);
    }
  }, [saving, dbGoal]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Set your goal</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          onChange={onChange}
          type="number"
          value={goal}
          min="10"
          max="100"
          step="10"
        />
        <span>books</span>
        <p className={styles.submit}>
          <input type="submit" value="start" />
        </p>
      </form>
    </div>
  );
};

export default Home;
