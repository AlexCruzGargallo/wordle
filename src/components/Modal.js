import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children, onClose, actionBar }) {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal-background")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 dark:bg-gray-800 opacity-80"></div>
      <div className="modal-background fixed top-0 left-0 flex items-center justify-center w-screen h-screen text-center dark:text-white">
        <div className="bg-white rounded-2xl w-72 p-10 dark:bg-[#26283a]">
          <div className="flex flex-col justify-between h-full gap-10">
            {children}
            <div className="flex justify-center">{actionBar}</div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
export default Modal;
