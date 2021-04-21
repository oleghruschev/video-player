export const formatTime = (time) => {
  if (time === undefined) return;

  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);

  return `${m}:${s < 10 ? `0${s}` : s}`;
};
