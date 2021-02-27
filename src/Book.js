import axios from "axios";

class Book {
  constructor(key) {
    this.key = key;
    
  }
  async search(query) {
    const results = await axios.get(
      `https://dapi.kakao.com/v3/search/book?query=${query}`,
      {
        headers: { Authorization: `KakaoAK ${this.key}` },
      }
    );

    return results;
  }
}

export default Book;
