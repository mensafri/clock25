import { useState } from "react";
import "./App.css";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessonTime] = useState(25);

  function breakDecrement() {
    if (breakTime > 1) {
      setBreakTime(breakTime - 1);
    }
  }

  function breakIncrement() {
    if (breakTime < 60) {
      setBreakTime(breakTime + 1);
    }
  }

  function sessionDecrement() {
    if (sessionTime > 1) {
      setSessonTime(sessionTime - 1);
    }
  }

  function sessionIncement() {
    if (breakTime < 60) {
      setSessonTime(sessionTime + 1);
    }
  }

  // function timeFormatter() {
  //   const minutes = Math.floor(timeLeft / 60);
  //   const seconds = timeLeft - minutes * 60;
  //   const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  //   const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  //   return `${formattedMinutes}:${formattedSeconds}`;
  // }

  return (
    <div className="App">
      <div id="break-session-label">
        <div className="label">
          <h2 id="break-label">Break Length</h2>
          <div className="button">
            <button id="break-decrement" onClick={breakDecrement}>
              Decrement
            </button>
            <p id="break-length">{breakTime}</p>
            <button id="break-increment" onClick={breakIncrement}>
              Increment
            </button>
          </div>
        </div>
        <div className="label">
          <h2 id="session-label">Session Length</h2>
          <div className="button">
            <button id="session-decrement" onClick={sessionDecrement}>
              Decrement
            </button>
            <p id="session-length">{sessionTime}</p>
            <button id="session-increment" onClick={sessionIncement}>
              Increment
            </button>
          </div>
        </div>
      </div>
      <div id="timer">
        <h1 id="timer-label">Session</h1>
        <p id="time-left">25:00</p>
        <div className="button">
          <button id="start_stop">Start/Stop</button>
          <button id="reset">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
