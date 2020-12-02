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
    // console.log("data", data);
    let newData = data.filter((oneData) => oneData[0].includes(e.target.value));
    console.log("newData", newData);
    setEnterText(e.target.value);
    setData(newData);
  };

  let listItems = data.map((item) => (
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
