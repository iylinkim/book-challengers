import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Book_Item from "./Book_Item";
import Book_list from "./Book_List";
// import { v4 as uuidv4 } from "uuid";
import { authService, dbService } from "fbase";
import styles from "components/tracker.module.css";

const Tracker = ({ book, userObj, loggedIn,setLoggedIn }) => {
  const [adding, setAdding] = useState(false);
  const [bookContainers, setBookContainers] = useState([]);
  const [dbBookGoal, setDbBookGoal] = useState("");
  const [left, setLeft] = useState("");

  const history = useHistory();

  const onClick = () => setAdding(true);
  console.log("Tracker");

  useEffect(() => {
    const ref = dbService.ref(`${userObj.uid}/books`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && setBookContainers(value);
    });
  }, [userObj.uid]);

  useEffect(() => {
    const ref = dbService.ref(`${userObj.uid}/goal`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      const bookNum = Object.keys(bookContainers).length;

      value && setDbBookGoal(value.bookGoal);
      setLeft(dbBookGoal - bookNum);
    });
  }, [dbBookGoal, left,userObj.uid,bookContainers]);

  const onSignout = () => {
    authService.signOut();
    setLoggedIn(false);
    history.push("/");

  };

  return (
    <>
      <p className={styles.main}>
        <img src="main.jpg" alt="book" />
      </p>
      <button onClick={onSignout} className={styles.logout}>
        Log out
      </button>
      <div className={styles.tracker}>
        <h2 className={styles.title}>{dbBookGoal} Books Challenges</h2>
        {left > 0 && (
          <h3 className={styles.left}>
            <span>{left}</span> books left until goal achievement!
          </h3>
        )}
        {adding && (
          <Book_list book={book} setAdding={setAdding} userObj={userObj} />
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
