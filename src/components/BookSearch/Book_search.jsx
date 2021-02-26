import styles from "components/BookSearch/book_search.module.css";

const Book_search = ({ bookInfo, setBookInfo }) => {
  const { title, thumbnail, authors } = bookInfo;

  const onClick = (event) => {
    const coverImg = event.currentTarget.querySelector("img").src;
    setBookInfo({
      coverImg,
    });
  };

  return (
    <li className={styles.result} onClick={onClick}>
      <p className={styles.cover}>
        <img src={thumbnail ? thumbnail : "default.png"} alt={title} />
      </p>
      <ul className={styles.text}>
        <li className={styles.title}>{title}</li>
        <li>{authors}</li>
      </ul>
    </li>
  );
};

export default Book_search;
