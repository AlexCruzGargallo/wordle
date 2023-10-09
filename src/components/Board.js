import Row from "./Row";

function Board({ answers }) {
  const renderedRows = answers.map((answer, index) => {
    return <Row key={index} answer={answer} rowIndex={index} />;
  });
  return <div className="flex flex-col gap-2 mb-2">{renderedRows}</div>;
}
export default Board;
