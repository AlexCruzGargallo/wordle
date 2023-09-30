import { useContext, useEffect } from "react";
import GameContext from "../context/game";

function Letter({ wordToCompare, letter, rowIndex }) {
  const { word, tries } = useContext(GameContext);
  useEffect(() => {}, [tries]);
  const def =
    "w-14 h-14 rounded border-2 border-gray-300 bg-[#fbfcff] flex items-center justify-center uppercase font-bold text-2xl dark:bg-[#191a24] dark:border-[#7b7f98] dark:text-white";
  const getClass = () => {
    if (letter && rowIndex >= tries) {
      return "defWithLetter";
    }
    if (rowIndex >= tries) {
      return "def";
    }
    if (letter === wordToCompare) {
      return "correct";
    }
    if (word.includes(letter)) {
      return "contains";
    }
    return "not";
  };
  return (
    <div data-class={getClass()} className={def}>
      {letter}
    </div>
  );
}
export default Letter;
