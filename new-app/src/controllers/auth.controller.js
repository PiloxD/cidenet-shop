const User2 = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Role = require('../models/role.model');


module.exports.register = async (req, res) => {
  try {

    const { typedocument, document, name, lastname, email, password, roles } = req.body;

    const newUser2 = new User2({
      typedocument,
      document,
      name,
      lastname,
      email,
      password: await User2.encryptPassword(password),
    });


    if (req.body.roles) {
      const foundRoles = await Role.find({ email: { $in: roles } });
      newUser2.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ email: "email" });
      newUser2.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser2 = await newUser2.save();

    // Create a token
    const token = jwt.sign({ id: savedUser2._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({
      token,
      code: 200
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error, {
      code: 500
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user2Found = await User2.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!user2Found) return res.status(200).json({
      message: "User Not Found",
      code: 400

    });

    const matchPassword = await User2.comparePassword(
      req.body.password,
      user2Found.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
        code: 401
      });

    const userForToken = {
      id: req.body._id,
      email: req.body.email
    }

    const token = jwt.sign(userForToken, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });


    res.send({
      email: req.body.email,
      token
    })
  } catch (error) {

    console.log(error);
  }
};