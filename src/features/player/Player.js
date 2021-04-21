import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPlayState,
  getCurrentTime,
  play,
  pause,
  setCurrentTime,
} from "./playerSlice";
import { formatTime } from "./utils";
import "./Player.css";

const Player = () => {
  const videoRef = useRef();
  const progressBarRef = useRef();
  const playerRef = useRef();

  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const isPlay = useSelector(getPlayState);
  const currentTime = useSelector(getCurrentTime);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    const handleTimeUpdate = () => {
      if (!videoRef) return;

      dispatch(setCurrentTime(videoRef.current?.currentTime));
    };

    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        togglePlay();
      }

      if (e.code === "ArrowLeft") {
        handlePrevPart();
      }
      if (e.code === "ArrowRight") {
        handleNextPart();
      }
    };

    videoRef.current.addEventListener("canplay", handleLoad);

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

    window.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      dispatch(play());
    } else {
      videoRef.current.pause();
      dispatch(pause());
    }
  }

  function handlePrevPart() {
    videoRef.current.currentTime = videoRef.current.currentTime - 10;
  }

  function handleNextPart() {
    videoRef.current.currentTime = videoRef.current.currentTime + 10;
  }

  function handleMute() {
    videoRef.current.muted = !videoRef.current.muted;
  }

  const handleClickProgressBar = (e) => {
    const time =
      (e.pageX - progressBarRef.current.offsetLeft) /
      progressBarRef.current.clientWidth;

    videoRef.current.currentTime = time * videoRef.current.duration;
  };

  return (
    <div className="player-wrapper" ref={playerRef}>
      <video className="video" ref={videoRef} onClick={togglePlay}>
        <source src="/videos/sample-mp4-file.mp4" type="video/mp4" />
      </video>
      {!isLoading && (
        <div className="controls">
          <button className="control-btn play-btn" onClick={togglePlay}>
            {isPlay ? "Pause" : "Play"}
          </button>
          <button onClick={handlePrevPart} className="control-btn">
            {"<<"}
          </button>
          <div
            className="progress-bar-wrapper"
            onClick={handleClickProgressBar}
            ref={progressBarRef}
          >
            <div
              className="progress-bar"
              style={{
                width: `${
                  (videoRef.current.currentTime / videoRef.current.duration) *
                  100
                }%`,
              }}
            />
          </div>
          <button onClick={handleNextPart} className="control-btn">
            {">>"}
          </button>
          <div className="time">
            <span>{formatTime(currentTime)}</span> /
            <span>{formatTime(videoRef.current.duration)}</span>
          </div>
          <button onClick={handleMute} className="control-btn" active>
            Mute
          </button>
        </div>
      )}
    </div>
  );
};

export default Player;
