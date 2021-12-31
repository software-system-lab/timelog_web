export const readableCounter = (secs) => {
  let seconds = Number(secs);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  seconds = Math.floor(seconds) % 60;
  return [hours, minutes, seconds]
      .map((v, i) => v < 10 ? "0" + v : v)
      .join(":");
};

export const formatDate = date => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}