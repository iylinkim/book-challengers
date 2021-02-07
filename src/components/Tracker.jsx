import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import Book_Item from "./Book_Item";
import Book_list from "./Book_List";
// import { v4 as uuidv4 } from "uuid";
import { dbService } from "fbase";
import styles from "components/tracker.module.css";
import { useHistory } from "react-router-dom";

const Tracker = ({ book }) => {
  const [adding, setAdding] = useState(false);
  const [bookContainers, setBookContainers] = useState([]);
  const [dbBookGoal, setDbBookGoal] = useState("");
  const [left, setLeft] = useState();

  const history = useHistory();

  // const dbBookGoal = history.location.state[0].bookGoal;
  // if (goal === undefined) {
  //   history.push({
  //     pathname: "/",
  //   });
  // }

  const onClick = () => {
    setAdding(true);
  };

  useEffect(() => {
    // getBookInfo();
    dbService.collection("books").onSnapshot((snapshot) => {
      const bookArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookContainers(bookArray);
      dbBookGoal && setLeft(dbBookGoal - bookArray.length);
    });
  }, [bookContainers]);

  useEffect(() => {
    dbService.collection("goal").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => setDbBookGoal(doc.data().bookGoal));
    });
  }, [dbBookGoal]);
  // console.log(bookContainers);

  return (
    <div className={styles.tracker}>
      <h2 className={styles.title}>{dbBookGoal} Books Challenges</h2>
      {left > 0 && (
        <h3 className={styles.left}>
          <span>{left}</span> books left until goal achievement!
        </h3>
      )}
      {adding && <Book_list book={book} setAdding={setAdding} />}
      <ul className={styles.book_containers}>
        {bookContainers.map((bookData) => {
          return <Book_Item key={bookData.id} bookData={bookData} />;
        })}
        {left > 0 && (
          <li className={styles.blank} onClick={onClick}>
            <span>+</span>
          </li>
        )}
      </ul>
      {left === 0 && <p>You ahieved your goal!</p>}
    </div>
  );
};

export default Tracker;
