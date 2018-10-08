module.exports = (num) => {
  let statusString = '';
  if (num === 0) {
    statusString = 'متاح';
  } else {
    statusString = 'مستعار';
  }
  return statusString;
};
