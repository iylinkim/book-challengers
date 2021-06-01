import styles from "components/BookSearch/BookSearch.module.css";
import { toggleClassName } from "utils";

const BookSearch = ({ bookInfo, setBookInfo, darkTheme }) => {
  const { title, thumbnail, authors } = bookInfo;

  const onClick = (event) => {
    const coverImg = event.currentTarget.querySelector("img").src;
    setBookInfo({
      coverImg,
      title,
    });
  };
  return (
    <li
      className={toggleClassName(darkTheme, styles, "result")}
      onClick={onClick}
    >
      <p className={styles.cover}>
        <img
          src={thumbnail ? thumbnail : "/book-challengers/images/default.png"}
          alt={title}
        />
      </p>
      <ul className={styles.text}>
        <li className={styles.title}>{title}</li>
        <li>{authors}</li>
      </ul>
    </li>
  );
};

export default BookSearch;
