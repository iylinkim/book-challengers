import React from "react";
import styles from 'components/book_item.module.css';

const Book_Item = ({ onClick, bookData }) => {
  const { thumbnail } = bookData;
  return (
    <li className={styles.book} onClick={onClick}>
      <p>
        <img src={thumbnail} alt="book cover"/>
      </p>
    </li>
  );
};

export default Book_Item;
