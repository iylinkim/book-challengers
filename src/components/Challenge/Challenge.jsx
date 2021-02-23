import React from "react";
import { useHistory } from "react-router-dom";

const Challenge = ({ title, info }) => {
  const history = useHistory();

  const goToTracker = () => {
    history.push({
      pathname: "/tracker",
      title,
      state: info,
    });
  };

  return <li onClick={goToTracker}>{title}</li>;
};

export default Challenge;
