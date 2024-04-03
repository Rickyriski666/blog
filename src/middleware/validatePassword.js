const validatePassword = (req, res, next) => {
  const { password } = req.body;

  const passwordRegex = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/
  );

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      status: 'Failed to create User',
      message:
        'password must be contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
    });
  }

  next();
};

module.exports = validatePassword;
