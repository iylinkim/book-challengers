import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import Book from "Book";
import '@fortawesome/fontawesome-free/js/all.js';

const KEY = process.env.REACT_APP_API_KEY;
const book = new Book(KEY);

ReactDOM.render(
  <React.StrictMode>
    <App book={book}/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
