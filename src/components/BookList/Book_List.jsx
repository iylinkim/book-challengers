import React, { useState, useRef } from "react";
import Book_search from "../BookSearch/Book_search";
import styles from "components/BookList/book_list.module.css";
import { dbService } from "fbase";

const Book_list = ({ book, setAdding, userObj, challengeName }) => {
  const [books, setBooks] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const inputRef = useRef();
  const ratingRef = useRef();

  const onClick = (event) => {
    console.log("submit");
    event.preventDefault();
    book
      .search(inputRef.current.value)
      .then((results) => setBooks(results.data.documents));
  };

  const submitRating = async () => {
    const rating = ratingRef.current.value;
    if (rating > 5) {
      alert("Put number under 5");
    } else {
      await dbService
        .ref(`${userObj.uid}/${challengeName}/books/${Date.now()}`)
        .set({
          thumbnail: bookInfo.coverImg,
          rating,
          createdAt: Date.now(),
        });
      setAdding(false);
    }
  };

  return (
    <div className={styles.list}>
      <form className={styles.form}>
        <input
          className={styles.input}
          ref={inputRef}
          type="text"
          placeholder="Search"
        />
        <button onClick={onClick} className={styles.submit}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      {Boolean(bookInfo.coverImg) ? (
        <div classNAME={styles.ratingInfo}>
          <img src={bookInfo.coverImg} />
          <span>Rate this book</span>
          <input
            ref={ratingRef}
            className={styles.ratingNum}
            type="number"
            min="0"
            max="5"
            step="0.1"
          />
          <span>/5</span>
          <button onClick={submitRating}>register</button>
        </div>
      ) : (
        ""
      )}
      {books.length > 0 ? (
        <ul className={styles.books}>
          {books.map((bookInfo) => (
            <Book_search
              key={bookInfo.isbn}
              bookInfo={bookInfo}
              setAdding={setAdding}
              userObj={userObj}
              challengeName={challengeName}
              setBookInfo={setBookInfo}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.no_result}>No result</p>
      )}
    </div>
  );
};

export default Book_list;
