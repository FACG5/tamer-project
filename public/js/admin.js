const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

const check = (input, errorMessageElement, errMessage) => {
  if (!input.value) {
    displayErr(errorMessageElement, errMessage);
  } else {
    displayErr(errorMessageElement, '');
    return true;
  }
};
