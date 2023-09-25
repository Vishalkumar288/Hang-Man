import React, { useState, useEffect } from "react";
import Header from "./GameOn";
import Figure from "./Body";
import WrongLetters from "./Death";
import Word from "./Life";
import Popup from "./YourSoul";
import Notification from "./SeekingDeath";
import { showNotification as show } from "../helpers/helpers";
import "./img.jpg";
import "./Fun.css";

const words = [
  "sphere",
  "spirit",
  "strive",
  "sunset",
  "system",
  "safari",
  "damage",
  "doctor",
  "decide",
  "danger",
  "direct",
  "design",
  "future",
  "family",
  "foster",
  "friend",
  "frozen",
  "flower",
  "global",
  "garden",
  "gentle",
  "genius",
  "ground",
  "guitar",
  "kingdom",
  "kindly",
  "kernel",
  "kitchen",
  "knight",
  "kettle",
  "animal",
  "active",
  "accent",
  "assert",
  "aprons",
  "avails",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function Fun() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <div >
      <Header playAgain={playAgain} />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default Fun;
