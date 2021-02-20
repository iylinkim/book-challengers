import React, { useState, useRef } from "react";
import Book_search from "../BookSearch/Book_search";
import styles from "components/BookList/book_list.module.css";

const Book_list = ({ book, setAdding, userObj }) => {
  const [books, setBooks] = useState([]);
  const inputRef = useRef();

  const onClick = (event) => {
    console.log("submit");
    event.preventDefault();
    book
      .search(inputRef.current.value)
      .then((results) => setBooks(results.data.documents));
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
        {/* <input className={styles.submit} type="submit" value="find" /> */}
        <button onClick={onClick} className={styles.submit}>
          <i className="fas fa-search"></i>
        </button>
      </form>

      {books.length > 0 ? (
        <ul className={styles.books}>
          {books.map((bookInfo) => (
            <Book_search
              key={bookInfo.isbn}
              bookInfo={bookInfo}
              setAdding={setAdding}
              userObj={userObj}
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
