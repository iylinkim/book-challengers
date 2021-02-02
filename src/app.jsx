import axios from "axios";
import "./app.css";

function App() {
  // const books = axios.create({
  //   url:'https://dapi.kakao.com/v3/search/book?target=title?query=미움',
  //   headers:{'Authorization': 'KakaoAK742e10ca3a65c754115634228a639144'},
  // });
  const book = axios.get(
    `https://dapi.kakao.com/v3/search/book?query=미움받을용기`,
    {
      headers: { Authorization: `KakaoAK ${process.env.CREATE_APP_API_KEY}` },
    }
  );
  console.log(book);
  return <h1>Hello</h1>;
}

export default App;
