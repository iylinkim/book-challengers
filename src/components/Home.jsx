import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { dbService } from "fbase";
import styles from "components/home.module.css";

const Home = () => {
  const history = useHistory();
  const [goal, setGoal] = useState(0);
  const [goals, setGoals] = useState([]);
  const [saving, setSaving] = useState(true);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setGoal(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("goal").add({
      bookGoal: goal,
    });
  };

  const getBookGoal = async () => {
    const dbGoal = await dbService.collection("goal").get();
    dbGoal.forEach((document) => {
      // 설정한 목표 Obj로 만듬
      const goalObj = {
        ...document.data(),
        id: document.id,
      };
      setGoals((prev) => [goalObj, ...prev]);
    });
  };
  
  console.log(goals);
  const goToTracker = () => {
    if (goals.length > 0) {
      history.push({
        pathname: "/tracker",
        state: goals,
      });
    }
  };
  useEffect(() => {
    console.log(saving);
    if (saving === false) {
      console.log("go to tracker");
      goToTracker();
    } else {
      console.log("get book goal");
      getBookGoal();
      setSaving(() => false);
    }
  }, [saving]);
  console.log(history.location);
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
