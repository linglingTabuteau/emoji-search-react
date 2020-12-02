import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [enterText, setEnterText] = useState("");

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

  let newData = data.filter((oneData) => oneData[0].includes(enterText));
  console.log("newData", newData);

  let listItems = newData.map((item) => (
    <li key={item[0]}>
      <img src={item[1]} />
      <p>{item[0]}</p>
    </li>
  ));

  return (
    <div className="App">
      <h1>Emoji Search</h1>
      <input value={enterText} onChange={searchHandler} />
      <ul className="List-emoji">{listItems}</ul>
    </div>
  );
}

export default App;
