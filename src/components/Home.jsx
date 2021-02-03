import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [goal, setGoal] = useState(0);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setGoal(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (goal > 0) {
      history.push({
        pathname: "/tracker",
        goal,
      });
    }else if(goal === 0){
      // alert("Set your goal!");
    }
  };

  return (
    <>
      <h2>Set your goal</h2>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="number"
          value={goal}
          min="10"
          max="100"
          step="10"
        />
        <span>books</span>
        <input type="submit" value="start" />
      </form>
    </>
  );
};

export default Home;
