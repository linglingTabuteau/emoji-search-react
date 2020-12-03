import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [enterText, setEnterText] = useState("");
  const [urlImage, setUrlImage] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/emojis")
      .then((res) => res.json())
      .then((result) => {
        let resultArray = Object.entries(result);
        setData(resultArray);
      });
  }, []);

  const searchHandler = (e) => {
    setEnterText(e.target.value);
  };

  const copyEmojiHandler = (urlImg) => {
    console.log("ok");
    setUrlImage(urlImg);
  };

  let newData = data.filter((oneData) => oneData[0].includes(enterText));

  let listItems = newData.map((item) => (
    <li key={item[0]} onClick={() => copyEmojiHandler(item[1])}>
      <img src={item[1]} alt={item[0]} />
      <p>{item[0]}</p>
      <p className="TextColor">click to copy emoji</p>
    </li>
  ));

  let copyEmoji = null;
  if (urlImage) {
    copyEmoji = <input src={urlImage} type="image" className="ImgWidth" />;
  }

  return (
    <div className="App">
      <div className="Title">
        <img src="https://github.githubassets.com/images/icons/emoji/unicode/1f638.png?v8" />{" "}
        <h1>Emoji Search</h1>
        <img src="https://github.githubassets.com/images/icons/emoji/unicode/1f408.png?v8" />
      </div>
      <input value={enterText} onChange={searchHandler} />
      {copyEmoji}
      <ul className="List-emoji">{listItems}</ul>
    </div>
  );
}

export default App;
