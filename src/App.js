import { useEffect, useState, useContext } from "react";
import useWindowSize from "./hooks/use-windowsize";
import Confetti from "react-confetti";
import GameContext from "./context/game";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import { FaRegMoon } from "react-icons/fa6";
import { BiSun } from "react-icons/bi";
import { BiRefresh } from "react-icons/bi";

function App() {
  const emptyAnswers = ["", "", "", "", "", ""];
  const [answers, setAnswers] = useState(emptyAnswers);
  const [guesses, setGuesses] = useState([]);
  const [isGuessed, setIsGuessed] = useState(false);
  const [showModalLose, setShowModalLose] = useState(false);
  const [showModalWin, setShowModalWin] = useState(false);
  const [showModalNotWord, setShowModalNotWord] = useState(false);
  const { word, fetchWord, tries, setTries, isWord, dark, handleTheme } =
    useContext(GameContext);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchWord();
  }, []);

  const closeModals = () => {
    setShowModalLose(false);
    setShowModalWin(false);
    setTimeout(() => {
      setShowModalNotWord(false);
    }, 1000);
  };

  const addCharToAnswer = (char) => {
    if (tries >= 6 || answers[tries].length >= 5 || isGuessed) {
      return;
    }
    const newAnswer = answers[tries] + char;

    const updatedAnswers = [...answers];
    updatedAnswers[tries] = newAnswer;
    setAnswers(updatedAnswers);
  };
  const addGuess = (guess) => {
    const newGuesses = [guess, ...guesses];
    setGuesses(newGuesses);
  };
  const deleteChar = () => {
    if (tries >= 6) {
      return;
    }
    const updatedAnswers = [...answers];
    updatedAnswers[tries] = updatedAnswers[tries].slice(0, -1);

    setAnswers(updatedAnswers);
  };

  const enterResult = () => {
    if (tries >= 6 || answers[tries].length !== 5) {
      return;
    }
    if (!isWord(answers[tries])) {
      setShowModalNotWord(true);
      closeModals();
      return;
    }
    animateLetters(tries);
    addGuess(answers[tries]);
    if (answers[tries] === word) {
      setIsGuessed(true);
      setShowModalWin(true);
      setTries(tries + 1);
      return;
    }
    setTries(tries + 1);
    if (tries >= 5) {
      setShowModalLose(true);
    }
  };

  const handleClose = () => {
    closeModals();
  };

  const handlePlayAgain = () => {
    setAnswers(emptyAnswers);
    setGuesses([]);
    resetCells(answers);
    setIsGuessed(false);
    closeModals();
    setTries(0);
    fetchWord();
  };

  const actionBar = (
    <div>
      <button
        className="bg-green-600 p-2 rounded-lg text-white font-bold"
        onClick={handlePlayAgain}
      >
        REINICIAR
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-5 max-w-[600px] m-auto">
        {isGuessed && (
          <Confetti
            gravity={0.05}
            recycle={false}
            tweenDuration={10000}
            width={width}
            height={height}
          />
        )}
        <h1 className="font-bold text-3xl m-5 dark:text-white tracking-wider">
          WORDLE
        </h1>
        <div className="flex justify-between ml-0 mr-auto gap-2">
          <div
            onClick={handleTheme}
            className="w-8 sm:w-11 md:w-10 h-10 sm:h-11 md:h-10 rounded bg-[#ebedf3] flex items-center justify-center capitalize font-bold cursor-pointer select-none hover:bg-[#e6f3e6] hover:text-[#57ac57] focus:bg-[#ebedf3] dark:bg-[#40445c] dark:text-white dark:hover:text-[#7bd27b] dark:hover:bg-[#2a402f] text-xl transition-all duration-300 ease-in-out"
          >
            {dark ? <FaRegMoon /> : <BiSun />}
          </div>
          <div
            onClick={handlePlayAgain}
            className="w-8 sm:w-11 md:w-10 h-10 sm:h-11 md:h-10 rounded bg-[#ebedf3] flex items-center justify-center capitalize font-bold cursor-pointer select-none hover:bg-[#e6f3e6] hover:text-[#57ac57] focus:bg-[#dce1ed] dark:bg-[#40445c] dark:text-white dark:hover:text-[#7bd27b] dark:hover:bg-[#2a402f] text-xl transition-all duration-300 ease-in-out"
          >
            <BiRefresh />
          </div>
        </div>
        <Board word={word} answers={answers} tries={tries} />
        {isGuessed && <div className="dark:text-white">Has ganado! 🥳</div>}
        {!isGuessed && tries >= 6 && (
          <div className="dark:text-white">Has perdido. 😭</div>
        )}
        <Keyboard
          word={word}
          answers={guesses}
          onClick={addCharToAnswer}
          onDelete={deleteChar}
          onSubmit={enterResult}
        />
        {showModalWin && (
          <Modal onClose={handleClose} actionBar={actionBar}>
            Enhorabuena, has ganado!
          </Modal>
        )}
        {showModalNotWord && (
          <Modal onClose={handleClose}>Palabra no encontrada.</Modal>
        )}
        {showModalLose && (
          <Modal onClose={handleClose} actionBar={actionBar}>
            <p>
              Lo siento, has perdido. 😭 <br />
              <br /> La palabra era "<b className="uppercase">{word}</b>"
            </p>
          </Modal>
        )}
      </div>
    </div>
  );
}
export default App;

async function animateLetters(actualTry) {
  const actualDiv = document.getElementById(`row-${actualTry}`);
  const subDivs = actualDiv.querySelectorAll("div");

  for (const subDiv of subDivs) {
    subDiv.setAttribute("id", "rotatingDiv");

    setTimeout(() => {
      subDiv.setAttribute("class", getClass(subDiv.getAttribute("data-class")));
    }, "250");

    await new Promise((resolve) => setTimeout(resolve, 500));

    subDiv.removeAttribute("id");
  }
}

function resetCells(answers) {
  for (let i = 0; i < answers.length; i++) {
    const actualDiv = document.getElementById(`row-${i}`);
    const subDivs = actualDiv.querySelectorAll("div");
    for (const subDiv of subDivs) {
      subDiv.setAttribute(
        "class",
        "w-14 h-14 rounded border-2 border-gray-300 bg-[#fbfcff] flex items-center justify-center uppercase font-bold text-2xl dark:bg-[#191a24] dark:border-[#7b7f98] dark:text-white"
      );
    }
  }
}

function getClass(data) {
  const defWithLetter =
    "w-14 h-14 rounded border-2 border-[#a7adc0] bg-[#fbfcff] flex items-center justify-center uppercase font-bold text-2xl";
  const correct =
    "w-14 h-14 rounded border-2 border-[#79b851] bg-[#79b851] flex items-center justify-center uppercase font-bold text-white text-2xl";
  const contains =
    "w-14 h-14 rounded border-2 border-[#f3c237] bg-[#f3c237] flex items-center justify-center uppercase font-bold text-white text-2xl";
  const not =
    "w-14 h-14 rounded border-2 border-[#a4aec4] bg-[#a4aec4] flex items-center justify-center uppercase font-bold text-white text-2xl";
  if (data === "defWithLetter") {
    return defWithLetter;
  }
  if (data === "correct") {
    return correct;
  }
  if (data === "contains") {
    return contains;
  }
  return not;
}
