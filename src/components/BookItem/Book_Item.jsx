import React from "react";
import styles from 'components/BookItem/book_item.module.css';

const Book_Item = ({ onClick, bookData }) => {
  const { thumbnail, rating } = bookData;
  return (
    <li className={styles.book} onClick={onClick}>
      <p>
        <img src={thumbnail} alt="book cover" />
      </p>
      <span>{rating}</span>
      <div className={styles.starWrap} style={{width:rating*20}}>
        <p className={styles.stars}>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </p>
      </div>
    </li>
  );
};

export default Book_Item;
