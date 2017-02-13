function isRequired (value) {
  let isValid = false;

  if(value)
    isValid = true;


  return isValid;
}

export {isRequired}
