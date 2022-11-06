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
  // timer countdown
  const [timerValue, setTimerValue] = useState(-1);

  const messageRef = useRef(null);

  useEffect(() => {
    if (isNewGame) {
      const answerIdx = getRange(2);
      const colorList = [];
      for (let i = 0; i < 3; i++) {
        colorList.push(getRandomHexColor());
      }
      setOptions(colorList);
      setAnswer(answerIdx);
      setIsNewGame(false);
    }
  }, [isNewGame]);

  // countdown for new game
  useEffect(() => {
    if (timerValue > 0) {
     setTimeout(() => {
        setTimerValue(prevValue => prevValue - 1)
      }, 1000);
    } else if(timerValue === 0) {
      initGame();
    }
  }, [timerValue]);


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
      setCorrect(true);
      setCount(prevValue => prevValue + 1);
      setTimerValue(3);
    }
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
      <div className="correct-container"
        style={correct && timerValue > 0 ? {display: "block"} : {display: "none"}}
      > 
        <p className="count-down">{correct && timerValue > 0 ? timerValue : ""}</p>
        <p className="correct">{correct && <i className="ri-heart-fill favorite"></i>} Correct</p>
      </div>
      <div className="color-block" style={{backgroundColor: options[answer]}}></div>
      <div className="correct-quiz" ref={messageRef}> 
        {!correct && "Incorrect"}
      </div>
      <div className="button-container">
        <button onClick={checkAnswer}>{options[0]}</button>
        <button onClick={checkAnswer}>{options[1]}</button>
        <button onClick={checkAnswer}>{options[2]}</button>
      </div>
      <div className="correct-count"><i className="ri-heart-fill favorite"></i> {count} corrects</div>
    </main>
  )
}