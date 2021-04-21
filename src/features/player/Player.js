import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import {
  getPlayState,
  getCurrentTime,
  getFullScreenState,
  getMuteState,
  play,
  pause,
  setCurrentTime,
  setFullScreen,
  setMute,
} from "./playerSlice";
import { formatTime } from "./utils";
import "./Player.css";
import * as Icons from "../../assets/icons";

const Player = () => {
  const videoRef = useRef();
  const progressBarRef = useRef();

  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const isPlay = useSelector(getPlayState);
  const currentTime = useSelector(getCurrentTime);
  const isFullScreen = useSelector(getFullScreenState);
  const isMute = useSelector(getMuteState);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    const handleTimeUpdate = () => {
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

      if (e.code === "Escape") {
        dispatch(setFullScreen(false));
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

  useEffect(() => {
    videoRef.current.muted = isMute;
  }, [isMute]);

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
    dispatch(setMute(!isMute));
  }

  function handleClickProgressBar(e) {
    const time =
      (e.pageX - progressBarRef.current.offsetLeft) /
      progressBarRef.current.clientWidth;

    videoRef.current.currentTime = time * videoRef.current.duration;
  }

  function toggleFullScreen() {
    dispatch(setFullScreen(!isFullScreen));
  }

  return (
    <div className={cx("player-wrapper", { fullscreen: isFullScreen })}>
      <video className="video" ref={videoRef} onClick={togglePlay}>
        <source src="/videos/sample-mp4-file.mp4" type="video/mp4" />
      </video>
      {!isLoading && (
        <div className="controls">
          <div className="controls-row">
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
                  width: `${(currentTime / videoRef.current.duration) * 100}%`,
                }}
              />
            </div>
            <button onClick={handleNextPart} className="control-btn">
              {">>"}
            </button>
          </div>
          <div className="controls-row">
            <div>
              <button className="control-btn play-btn" onClick={togglePlay}>
                {isPlay ? <Icons.Pause /> : <Icons.Play />}
              </button>
              <button onClick={handleMute} className="control-btn">
                {isMute ? <Icons.Mute /> : <Icons.Dynamic />}
              </button>
            </div>
            <div className="time">
              <span>{formatTime(currentTime)}</span> /
              <span>{formatTime(videoRef.current.duration)}</span>
            </div>
            <button onClick={toggleFullScreen} className="control-btn">
              {isFullScreen ? <Icons.Minimaize /> : <Icons.Expand />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
