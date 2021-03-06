import React, { useState, useRef } from "react";
import BookSearch from "../BookSearch/BookSearch";
import styles from "components/BookList/BookList.module.css";
import { dbService } from "fbase";
import { toggleClassName } from "utils";
import { useBooks } from "hooks/state";

const BookList = ({ book, setAdding, userObj, challengeName, darkTheme }) => {
  const inputRef = useRef();
  const ratingRef = useRef();
  const { books, bookInfo, setBookInfo, onClick } = useBooks(book, inputRef);

  const submitRating = async () => {
    const rating = ratingRef.current.value;
    if (rating > 5) {
      alert("Put number under 5");
    } else if (rating === "") {
      alert("Input number abouth this book!");
    } else {
      const timestamp = Date.now();
      await dbService
        .ref(`${userObj.uid}/${challengeName}/books/${timestamp}`)
        .set({
          thumbnail: bookInfo.coverImg,
          title: bookInfo.title,
          rating,
          createdAt: timestamp,
        });
      setAdding(false);
    }
  };

  return (
    <div className={styles.list}>
      <form className={styles.form}>
        <input
          className={toggleClassName(darkTheme, styles, "input")}
          ref={inputRef}
          type="text"
          placeholder="Search"
        />
        <button onClick={onClick} className={styles.submit}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className={styles.bookContainer}>
        {books.length > 0 ? (
          <ul className={toggleClassName(darkTheme, styles, "books")}>
            {books.map((bookInfo) => (
              <BookSearch
                key={bookInfo.isbn}
                bookInfo={bookInfo}
                setAdding={setAdding}
                userObj={userObj}
                challengeName={challengeName}
                setBookInfo={setBookInfo}
                darkTheme={darkTheme}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.no_result}>No result</p>
        )}
        {Boolean(bookInfo.coverImg) ? (
          <div className={styles.ratingInfo}>
            <img
              className={styles.previewImg}
              src={bookInfo.coverImg}
              alt="book cover"
            />
            <p>Rate this book</p>
            <p className={styles.ratingText}>
              <input
                ref={ratingRef}
                className={styles.ratingNum}
                type="number"
                autoFocus
                min="0"
                max="5"
                step="0.1"
                required
              />
              <span>/5</span>
              <button
                className={toggleClassName(darkTheme, styles, "register")}
                onClick={submitRating}
              >
                register
              </button>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BookList;
