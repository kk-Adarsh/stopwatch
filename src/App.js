import { useEffect, useState } from "react";
import "./App.css";
import { FaPlay, FaPause, FaStop, FaClockRotateLeft } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

function App() {
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const milliseconds = time % 100;

  const startAndPause = () => {
    if (isStopped) {
      setTime(0);
      setIsStopped(false);
    }
    setIsRunning(!isRunning);
  };
  const Stop = () => {
    setIsRunning(false);
    setIsStopped(true);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };
  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button
          className={`button  items-center ${
            isRunning ? "orange-button" : "green-button"
          }`}
          type="button"
          onClick={startAndPause}
        >
          {isRunning ? (
            <>
              Pause <FaPause />
            </>
          ) : (
            <>
              Start <FaPlay />
            </>
          )}
        </button>
        <button
          className="button violet-button items-center"
          type="button"
          onClick={Stop}
        >
          Stop <FaStop />
        </button>
        <button
          className="button red-button items-center"
          type="button"
          onClick={reset}
        >
          Reset <FaClockRotateLeft className="stroke-custom" />
        </button>
      </div>
    </div>
  );
}

export default App;
