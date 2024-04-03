const bycript = require('bcryptjs');

const hashPassword = async (password) => {
  const saltRound = await bycript.genSalt(10);
  const passwordHash = await bycript.hash(password, saltRound);

  return passwordHash;
};

module.exports = hashPassword;
