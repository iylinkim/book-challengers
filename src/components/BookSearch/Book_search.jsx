import { useState } from "react";
import { dbService } from "fbase";
import styles from "components/BookSearch/book_search.module.css";

const Book_search = ({ bookInfo, setAdding, userObj }) => {
  const { title, thumbnail, authors, isbn } = bookInfo;

  const onClick = async () => {
    const OK = window.confirm("add this book your tracker?");
    if (OK) {
      await dbService.ref(`${userObj.uid}/books/${Date.now()}`).set({
        thumbnail,
        createdAt: Date.now(),
        title
      });
      setAdding(false);
    }
  };
  console.log(test);
  return (
    <li className={styles.result} onClick={onClick}>
      <p className={styles.cover}>
        <img src={thumbnail} alt={title} />
      </p>
      <ul className={styles.text}>
        <li className={styles.title}>{title}</li>
        <li>{authors}</li>
      </ul>
    </li>
  );
};

export default Book_search;
