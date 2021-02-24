import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Book_Item from "../BookItem/Book_Item";
import Book_list from "../BookList/Book_List";
import {  dbService } from "fbase";
import styles from "components/Tracker/tracker.module.css";

const Tracker = ({ book, userObj }) => {
  const [adding, setAdding] = useState(false);
  const [bookContainers, setBookContainers] = useState([]);
  const [left, setLeft] = useState("");
  const history = useHistory();

  const LS_CHALLENGE = "challenge title";
  const LS_GOAL = "goal";

  const onClick = () => setAdding(true);
 
  console.log("Tracker");

  useEffect(() => {
    if (history.location.state) {
      window.localStorage.setItem(LS_CHALLENGE, history.location.title);
      window.localStorage.setItem(
        LS_GOAL,
        history.location.state.goal.bookGoal
      );
    }
  }, []);

  useEffect(() => {
    const ref = dbService.ref(
      `${userObj.uid}/${window.localStorage.getItem(LS_CHALLENGE)}/books`
    );
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && setBookContainers(value);
    });
  }, [userObj.uid]);

  useEffect(() => {
    const bookNum = Object.keys(bookContainers).length;
    setLeft(() => window.localStorage.getItem(LS_GOAL) - bookNum);
  }, [bookContainers, left]);

  return (
    <>
      <p className={styles.main}>
        <img src="main.jpg" alt="book" />
      </p>
      {/* <button onClick={onSignout} className={styles.logout}>
        Log out
      </button> */}
      <div className={styles.tracker}>
        <h2 className={styles.title}>
          {window.localStorage.getItem(LS_GOAL)} Books Challenges
        </h2>
        <h4>"{window.localStorage.getItem(LS_CHALLENGE)}"</h4>
        {left > 0 && (
          <h3 className={styles.left}>
            <span>{left}</span> books left until goal achievement!
          </h3>
        )}
        {adding && (
          <Book_list
            book={book}
            setAdding={setAdding}
            userObj={userObj}
            challengeName={window.localStorage.getItem(LS_CHALLENGE)}
          />
        )}
        <ul className={styles.book_containers}>
          {Object.keys(bookContainers).map((key) => {
            return <Book_Item key={key} bookData={bookContainers[key]} />;
          })}
          {left >= 0 && (
            <li className={styles.blank} onClick={onClick}>
              <span>+</span>
            </li>
          )}
        </ul>
        {left === 0 && (
          <p className={styles.achieved}>
            <i className="fas fa-trophy"></i>
            <span>You achieved your goal!</span>
          </p>
        )}
      </div>
    </>
  );
};

export default Tracker;
