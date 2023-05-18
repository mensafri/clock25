import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessonTime] = useState(25);
  const [play, setPlay] = useState(false);
  const [titlePlay, setTitlePlay] = useState("play");
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

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
      setTimeLeft(timeLeft - 60);
    }
  }

  function sessionIncement() {
    if (breakTime < 60) {
      setSessonTime(sessionTime + 1);
      setTimeLeft(timeLeft + 60);
    }
  }

  function timeFormatter() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function handlePlay() {
    clearTimeout(timeout);
    setPlay(!play);
  }

  function handleReset() {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakTime(5);
    setSessonTime(25);
    setTitlePlay("play");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }

  function resetTimer(){
    const audio = document.getElementById("beep");
    if (!timeLeft && titlePlay === "play") {
      setTimeLeft(breakTime * 60);
      setTitlePlay("break");
      audio.play();
    }
    if (!timeLeft && titlePlay === "break") {
      setTimeLeft(sessionTime * 60);
      setTitlePlay("play");
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function clock() {
    if(play){
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])

  const title = titlePlay === "play" ? "Session" : "Break";

  return (
    <div className="App">
      <h2>25 + 5 Clock</h2>
      <div id="break-session-label">
        <div className="label">
          <h2 id="break-label">Break Length</h2>
          <div className="button">
            <button
              disabled={play}
              id="break-decrement"
              onClick={breakDecrement}
            >
              Decrease
            </button>
            <p id="break-length">{breakTime}</p>
            <button
              disabled={play}
              id="break-increment"
              onClick={breakIncrement}
            >
              Increase
            </button>
          </div>
        </div>
        <div className="label">
          <h2 id="session-label">Session Length</h2>
          <div className="button">
            <button
              disabled={play}
              id="session-decrement"
              onClick={sessionDecrement}
            >
              Decrease
            </button>
            <p id="session-length">{sessionTime}</p>
            <button
              disabled={play}
              id="session-increment"
              onClick={sessionIncement}
            >
              Increase
            </button>
          </div>
        </div>
      </div>
      <div id="timer">
        <h1 id="timer-label">{title}</h1>
        <p id="time-left">{timeFormatter()}</p>
        <div className="button">
          <button id="start_stop" onClick={handlePlay}>
            Start/Stop
          </button>
          <button id="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
