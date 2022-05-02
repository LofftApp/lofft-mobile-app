const unitToTen = value => {
  return value.toString().length === 1 ? `0${value}` : value;
};

export const dateFormatter = date => {
  const day = unitToTen(date.getDate());
  const month = unitToTen(date.getMonth() + 1);
  return `${day}-${month}-${date.getFullYear()}`;
};

export const dateStringFormatter = date => {
  const formattedDate = dateFormatter(date);
  const splitDate = formattedDate.split('-');
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
};

export const timeFormatter = time => {
  const hours = unitToTen(time.getHours());
  const minutes = unitToTen(time.getMinutes());
  return `${hours}:${minutes}`;
};
