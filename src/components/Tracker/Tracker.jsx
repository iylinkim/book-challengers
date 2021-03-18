import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BookItem from "../BookItem/BookItem";
import BookList from "../BookList/BookList";
import { dbService } from "fbase";
import styles from "components/Tracker/tracker.module.css";

const Tracker = ({ book, userObj, darkTheme }) => {
  const [adding, setAdding] = useState(false);
  const [bookContainers, setBookContainers] = useState([]);
  const [left, setLeft] = useState("");
  const history = useHistory();

  const LS_CHALLENGE = "challenge title";
  const LS_GOAL = "goal";
  const challengeTitle = window.localStorage.getItem(LS_CHALLENGE);

  const onClick = () => setAdding(true);

  useEffect(() => {
    if (history.location.state) {
      window.localStorage.setItem(LS_CHALLENGE, history.location.title);
      window.localStorage.setItem(
        LS_GOAL,
        history.location.state.goal.bookGoal
      );
    }
  }, [history.location.state, history.location.title]);

  useEffect(() => {
    const ref = dbService.ref(
      `${userObj.uid}/${window.localStorage.getItem(LS_CHALLENGE)}/books`
    );
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setBookContainers(value);
      } else {
        setBookContainers([]);
      }
    });
  }, [userObj.uid]);

  useEffect(() => {
    const bookNum = Object.keys(bookContainers).length;
    setLeft(() => window.localStorage.getItem(LS_GOAL) - bookNum);
  }, [bookContainers, left]);

  return (
    <>
      <div className={styles.tracker}>
        <h2 className={styles.title}>
          {window.localStorage.getItem(LS_GOAL)} Books Challenges
        </h2>
        <h4>"{window.localStorage.getItem(LS_CHALLENGE)}"</h4>
        {left > 0 && (
          <h3
            className={
              darkTheme ? `${styles.dark} ${styles.left}` : `${styles.left}`
            }
          >
            <span>{left}</span> books left until goal achievement!
          </h3>
        )}
        {adding && (
          <BookList
            book={book}
            setAdding={setAdding}
            userObj={userObj}
            challengeName={window.localStorage.getItem(LS_CHALLENGE)}
            darkTheme={darkTheme}
          />
        )}
        <ul className={styles.book_containers}>
          {Object.keys(bookContainers).map((key) => {
            return (
              <BookItem
                key={key}
                userObj={userObj}
                bookData={bookContainers[key]}
                challengeTitle={challengeTitle}
                darkTheme={darkTheme}
              />
            );
          })}
          {left > 0 && (
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
