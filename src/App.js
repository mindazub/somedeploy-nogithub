import React, { useState, useEffect } from "react";
import nice from "./nice.svg";
import "./App.css";

function App() {
  const [joke, setJoke] = useState("");
  const [seconds, setSeconds] = useState(33);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch(
          "https://official-joke-api.appspot.com/random_joke"
        );
        const data = await response.json();
        setJoke(`${data.setup} - ${data.punchline}`);
      } catch (error) {
        console.error("Error fetching the joke:", error);
      }
    };

    fetchJoke();
    const jokeInterval = setInterval(() => {
      fetchJoke();
      setSeconds(60); // Reset the countdown timer
    }, 60000);

    return () => clearInterval(jokeInterval);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 60));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={nice} className="nice" alt="nice" width={200} />
        <p>{joke ? joke : "Loading joke..."}</p>
        <p>Next joke in: {seconds}s</p>
      </header>
    </div>
  );
}

export default App;
