import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [emojis, setEmojis] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [copyUrlImage, setCopyUrlImage] = useState("");

  // use Async And Await to get Emojis Data
  useEffect(() => {
    const getData = async (url) => {
      let response = await fetch(url);
      let data = await response.json();
      let resultArray = Object.entries(data);
      setEmojis(resultArray);
    };
    getData("https://api.github.com/emojis");
  }, []);

  const searchHandler = (e) => {
    setSearchText(e.target.value);
  };

  const copyEmojiHandler = (urlImg) => {
    setCopyUrlImage(urlImg);
  };

  let emojisFilter = emojis.filter((oneData) =>
    oneData[0].includes(searchText)
  );

  let listItems = emojisFilter.map((item) => (
    <li key={item[0]} onClick={() => copyEmojiHandler(item[1])}>
      <img src={item[1]} alt={item[0]} />
      <p>{item[0]}</p>
      <p className="TextColor">click to copy emoji</p>
    </li>
  ));

  let copyEmoji = null;
  if (copyUrlImage) {
    copyEmoji = <input src={copyUrlImage} type="image" className="ImgWidth" />;
  }

  return (
    <div className="App">
      <div className="Title">
        <img src="https://github.githubassets.com/images/icons/emoji/unicode/1f638.png?v8" />{" "}
        <h1>Emoji Search</h1>
        <img src="https://github.githubassets.com/images/icons/emoji/unicode/1f408.png?v8" />
      </div>
      <input value={searchText} onChange={searchHandler} />
      {copyEmoji}
      <ul className="List-emoji">{listItems}</ul>
    </div>
  );
}

export default App;
