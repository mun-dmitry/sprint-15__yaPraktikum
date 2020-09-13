const urlValidationHelper = (value, helpers) => {
  const ifJoiCantWeWillHelp = /^(ftp|http|https):\/\/(([^ "]+)\.)+([^ "]+)$/;
  if (ifJoiCantWeWillHelp.test(value)) {
    return value;
  }
  return helpers.error('any.invalid');
};

module.exports = urlValidationHelper;
