const unitToTen = value => {
  return value.toString().length === 1 ? `0${value}` : value;
};

export const dateFormatter = date => {
  const day = unitToTen(date.getDate());
  const month = unitToTen(date.getMonth() + 1);
  return `${day} - ${month} - ${date.getFullYear()}`;
};

export const timeFormatter = time => {
  console.log(time.getHours());
  const hours = unitToTen(time.getHours());
  const minutes = unitToTen(time.getMinutes());
  return `${hours}:${minutes}`;
};
