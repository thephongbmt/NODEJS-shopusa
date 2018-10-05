let regexCheck = (regex = /./, validationString = '') => {
  return regex.test(validationString);
};

export default {
  email: email => regexCheck(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, email),
  phone: phone => regexCheck(/^0\d{9,10}$/, phone)
};
