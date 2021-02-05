import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import Book_Item from "./Book_Item";
import Book_list from "./Book_List";
// import { v4 as uuidv4 } from "uuid";
import { dbService } from "fbase";
import styles from "components/tracker.module.css";

const Tracker = ({ book }) => {
  const [adding, setAdding] = useState(false);
  const [bookContainers, setBookContainers] = useState([]);

  // const history = useHistory();

  // if (goal === undefined) {
  //   history.push({
  //     pathname: "/",
  //   });
  // }

  const onClick = () => {
    // history.push({
    //   pathname: "/book_list",
    //   fill: fillBookContainers,
    //   test: "test",
    // });
    setAdding(true);
  };

  // const getBookInfo = async () => {
  //   const dbBooks = await dbService.collection("books").get();
  //   dbBooks.forEach((document) => {
  //     const bookObj = {
  //       ...document.data(),
  //       id: document.id,
  //     };

  //     setBookContainers((prev) => [bookObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getBookInfo();
    dbService.collection("books").onSnapshot((snapshot) => {
      const bookArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookContainers(bookArray);
    });
  }, []);

  return (
    <div className={styles.tracker}>
      <h2 className={styles.title}>Books Challenges</h2>
      {adding && <Book_list book={book} setAdding={setAdding}/>}
      <ul className={styles.book_containers}>
        {bookContainers.map((bookData) => {
          return <Book_Item key={bookData.id} bookData={bookData} />;
        })}
        <li className={styles.blank} onClick={onClick}>
          <span>+</span>
        </li>
      </ul>
    </div>
  );
};

export default Tracker;
