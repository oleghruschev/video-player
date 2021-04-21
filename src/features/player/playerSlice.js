import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  currentTime: 0,
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
  },
});

export const { play, pause, setCurrentTime } = playerSlice.actions;

export const getPlayState = (state) => state.player.isPlay;

export const getCurrentTime = (state) => state.player.currentTime;

export default playerSlice.reducer;
