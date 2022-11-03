import React, {useEffect, useState, useRef} from "react";

export default function ColorGuess() {
  // total correct 
  const [count, setCount] = useState(0);
  // three random options
  const [options, setOptions] = useState([]);
  // answer
  const [answer, setAnswer] = useState(0);
  // correct
  const [correct, setCorrect] = useState(false);
  // isNewGame
  const [isNewGame, setIsNewGame] = useState(true);

  const messageRef = useRef(null);

  useEffect(() => {
    if (isNewGame) {
      const answerIdx = getRange(2);
      const colorList = [];
      for (let i = 0; i < 3; i++) {
        colorList.push(getRandomHexColor());
      }

      //console.log(colorList);
      //console.log("answeridx: " + answerIdx);
      setOptions(colorList);
      setAnswer(answerIdx);
      setIsNewGame(false);
    }
  }, [isNewGame]);

  function getRange(num) {
    return Math.floor(Math.random() * (num+ 1));
  }

  function getRandomHexColor() {
    return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`
  }

  function getRandomHex() {
    return getRange(255).toString(16).padStart(2, '0').toUpperCase();
  }

  function checkAnswer(event) {
    if (correct) return;
    if (event.target.innerText === options[answer]) {
      //console.log(answer + "correct");
      setCorrect(true);
      setCount(prevValue => prevValue + 1);
      setTimeout(() => {
        initGame();
      }, 3000);
    }
    //console.log(messageRef.current)
    messageRef.current.style.display = "block";
    
  }

  function initGame() {
    setOptions([]);
    setIsNewGame(true);
    setCorrect(false);
    messageRef.current.style.display = "none";
  }
  
  return (
    <main className="game-container">
      <div className="correct-count"><i className="ri-heart-fill favorite"></i> {count}</div>
      <div className="color-block" style={{backgroundColor: options[answer]}}></div>
      <div className="correct-quiz" ref={messageRef}> {correct && <i className="ri-heart-fill favorite"></i>}
      {correct ? " Correct" : "Incorrect"}
      </div>
      <div className="button-container">
        <button onClick={checkAnswer}>{options[0]}</button>
        <button onClick={checkAnswer}>{options[1]}</button>
        <button onClick={checkAnswer}>{options[2]}</button>
      </div>
    </main>
  )
}