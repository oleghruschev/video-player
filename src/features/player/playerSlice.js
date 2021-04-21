import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  currentTime: 0,
  isFullScreen: false,
  isMute: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play(state) {
      state.isPlay = true;
    },
    pause(state) {
      state.isPlay = false;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setFullScreen(state, action) {
      state.isFullScreen = action.payload;
    },
    setMute(state, action) {
      state.isMute = action.payload;
    },
  },
});

export const {
  play,
  pause,
  setCurrentTime,
  setFullScreen,
  setMute,
} = playerSlice.actions;

export const getPlayState = (state) => state.player.isPlay;

export const getCurrentTime = (state) => state.player.currentTime;

export const getFullScreenState = (state) => state.player.isFullScreen;

export const getMuteState = (state) => state.player.isMute;

export default playerSlice.reducer;
