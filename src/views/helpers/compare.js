module.exports = (t) => {
  const today = new Date();
  let month = `${today.getMonth() + 1}`;
  let day = `${today.getDate()}`;
  const year = today.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const currentDate = new Date(`${year}-${month}-${day}`);
  const time = new Date(t);
  const dateDiff = Math.floor((Date.UTC(time.getFullYear(), time.getMonth(), time.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));

  if (dateDiff > 0) {
    return 'current';
  }
  return 'late';
};
