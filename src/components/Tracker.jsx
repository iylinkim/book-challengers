import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const Tracker = ({ book }) => {
  const [books, setBooks] = useState([]);
  const inputRef = useRef();
  const history = useHistory();
  const {
    location: { goal },
  } = history;

  const onSubmit = (event) => {
    event.preventDefault();
    book
      .search(inputRef.current.value)
      .then((results) => setBooks(results.data.documents));
  };
  console.log(goal);
  if (goal === undefined) {
    history.push({
      pathname: "/",
    });
  }
  return (
    <div>
      <h2>{goal} Books Challenges</h2>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" placeholder="Search" />
        <input type="submit" value="find" />
      </form>
      <ul></ul>
    </div>
  );
};

export default Tracker;
