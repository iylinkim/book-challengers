import React from "react";
import styles from "components/BookItem/BookItem.module.css";
import { dbService } from "fbase";
import { toggleClassName } from "utils";

const BookItem = ({
  onClick,
  userObj,
  bookData,
  challengeTitle,
  darkTheme,
}) => {
  const { thumbnail, rating } = bookData;

  const onDelete = async () => {
    const ref = dbService.ref(
      `${userObj.uid}/${challengeTitle}/books/${bookData.createdAt}`
    );
    await ref.remove();
  };

  return (
    <li className={styles.book} onClick={onClick}>
      <p>
        <img className={styles.thumbnail} src={thumbnail} alt="book cover" />
      </p>
      <div className={styles.rating}>
        <span className={toggleClassName(darkTheme, styles, "ratingNum")}>
          {rating}
        </span>
        {/* 별점 영역 전체 너비 75px*/}
        <div className={styles.starWrap} style={{ width: rating * 0.2 * 75 }}>
          <p className={styles.stars}>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </p>
        </div>
      </div>
      <button className={styles.deleteBtn} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default BookItem;
