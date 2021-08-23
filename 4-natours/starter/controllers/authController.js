const User = require('./../models/usersModel');
// const catchAsync = require('./../utils/catchAsync');

exports.signup = async (req, res, next) => {

  try {
    // const newUser = await User.create(req.body); NOT TO USE THIS ANYMORE WHEN SIGN UP USER
    const newUser = User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
    res
      .status(201)
      .json({
        status: 'success',
        data: {
          user: newUser
        }
      });
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      });
  }
}