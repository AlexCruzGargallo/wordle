import { createContext, useEffect, useState } from "react";
import { WORDS } from "../data/words";

const GameContext = createContext();

function GameProvider({ children }) {
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  const [word, setWord] = useState("");
  const [tries, setTries] = useState(0);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.querySelector("html").classList.add("dark");
      document.body.style.backgroundColor = "#13141c";
    } else {
      document.querySelector("html").classList.remove("dark");
      document.body.style.backgroundColor = "white";
    }
  }, [dark]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const fetchWord = () => {
    setWord(removeAccents(randomWord).toLowerCase());
  };

  const restartGame = () => {
    fetchWord();
    setTries(0);
  };

  const isWord = (word) => {
    return WORDS.includes(word);
  };

  const handleTheme = () => {
    setDark(!dark);
  };

  const data = {
    word,
    tries,
    dark,
    isWord,
    setTries,
    fetchWord,
    restartGame,
    handleTheme,
  };

  return <GameContext.Provider value={data}>{children}</GameContext.Provider>;
}

export { GameProvider };
export default GameContext;
