import { useContext } from "react";
import GameContext from "../context/game";
import Letter from "./Letter";

function Row({ answer, rowIndex }) {
  const { word } = useContext(GameContext);

  const renderedKeys = new Array(5).fill(0).map((letter, index) => {
    return (
      <Letter
        key={index}
        rowIndex={rowIndex}
        wordToCompare={word[index]}
        letter={answer[index]}
      />
    );
  });
  return (
    <div id={"row-" + rowIndex} className="flex gap-1.5">
      {renderedKeys}
    </div>
  );
}
export default Row;
