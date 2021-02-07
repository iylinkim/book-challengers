import { dbService } from "fbase";
import styles from "components/book_search.module.css";

const Book_search = ({ bookInfo, setAdding }) => {
  const { title, thumbnail, authors } = bookInfo;
  const onClick = async () => {
    const OK = window.confirm("add this book your tracker?");
    if (OK) {
      await dbService.collection("books").add({
        thumbnail,
        createdAt: Date.now(),
      });
      // alert("서재에 추가되었습니다");
      setAdding(false);
    }
  };

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
