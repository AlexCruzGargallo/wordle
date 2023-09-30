import { useCallback, useEffect, useMemo } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

function Keyboard({ word, answers, onClick, onDelete, onSubmit }) {
  const keys = useMemo(() => ["qwertyuiop", "asdfghjklñ", "-zxcvbnm+"], []);
  const keyClassDefault =
    "w-8 sm:w-11 md:w-14 h-10 sm:h-11 md:h-14 rounded border flex items-center justify-center capitalize font-bold cursor-pointer select-none border-[#dce1ed] bg-[#dce1ed] hover:bg-[#c4cbdd] focus:bg-[#dce1ed] transition-all duration-300 ease-in-out dark:border-[#81859c] dark:bg-[#81859c] dark:hover:bg-[#c4cbdd] dark:focus:bg-[#81859c] dark:text-white";
  const keyClassNot =
    "w-8 sm:w-11 md:w-14 h-10 sm:h-11 md:h-14 rounded border flex items-center justify-center capitalize font-bold cursor-pointer select-none border-[#81859c] bg-[#81859c] dark:border-[#3d4054] dark:bg-[#3d4054] text-white";
  const keyClassCorrect =
    "w-8 sm:w-11 md:w-14 h-10 sm:h-11 md:h-14 rounded border flex items-center justify-center capitalize font-bold cursor-pointer select-none border-[#79b851] bg-[#79b851] text-white";
  const keyClassContain =
    "w-8 sm:w-11 md:w-14 h-10 sm:h-11 md:h-14 rounded border flex items-center justify-center capitalize font-bold cursor-pointer select-none border-[#f3c237] bg-[#f3c237] text-white";

  const handler = useCallback(
    (event) => {
      event.preventDefault();
      const key = event.key.toLowerCase();

      if (keys.some((row) => row.includes(key))) {
        onClick(key);
      }
      if (key === "backspace" || key === "delete") {
        onDelete();
      }
      if (key === "enter") {
        onSubmit();
      }
    },
    [onClick, onDelete, onSubmit, keys]
  );

  const getClass = (letra, respuestas, palabraAdivinar) => {
    for (const respuesta of respuestas) {
      if (respuesta.includes(letra)) {
        const indiceRespuesta = respuesta.indexOf(letra);
        const indiceAdivinar = palabraAdivinar.indexOf(letra);

        if (indiceRespuesta === indiceAdivinar) {
          return keyClassCorrect;
        } else if (palabraAdivinar.includes(letra)) {
          return keyClassContain;
        } else {
          return keyClassNot;
        }
      }
    }

    return keyClassDefault;
  };

  useEffect(() => {
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handler]);

  const renderedKeys = keys.map((row, index) => {
    return (
      <div className="flex gap-1 justify-center" key={index}>
        {row.split("").map((key, index) => {
          if (key === "-") {
            return (
              <div
                tabIndex="0"
                onClick={onDelete}
                className={keyClassDefault}
                style={{ flex: "2 1" }}
                key={index}
              >
                <FaDeleteLeft className="text-xl" />
              </div>
            );
          } else if (key === "+") {
            return (
              <div
                tabIndex="0"
                onClick={onSubmit}
                className={keyClassDefault}
                style={{ flex: "2 1" }}
                key={index}
              >
                Enter
              </div>
            );
          }
          return (
            <div
              tabIndex="0"
              onClick={() => {
                onClick(key);
              }}
              className={getClass(key, answers, word)}
              key={index}
            >
              {key}
            </div>
          );
        })}
      </div>
    );
  });
  return <div className="flex gap-2 flex-col mt-5 mb-5">{renderedKeys}</div>;
}
export default Keyboard;
