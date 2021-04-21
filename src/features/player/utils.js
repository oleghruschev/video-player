export const formatTime = (time) => {
  if (time === undefined) return;

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
