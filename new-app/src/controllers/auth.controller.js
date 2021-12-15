const User = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Role = require('../models/role.model');


module.exports.register = async (req, res) => {
    try {
      
      const { username, email, password, roles } = req.body;
      
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });
  
      
      if (req.body.roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }
  
      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();
   
      // Create a token
      const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
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
          const userFound = await User.findOne({ email: req.body.email }).populate(
        "roles"
      );
  
      if (!userFound) return res.status(200).json({ 
        message: "User Not Found",
        code: 400
      
      });
  
      const matchPassword = await User.comparePassword(
        req.body.password,
        userFound.password
      );
  
      if (!matchPassword)
        return res.status(200).json({
          token: null,
          message: "Invalid Password",
          code: 401
        });
  
      const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400, // 24 hours
      });

      
      res.status(200).send('Ingresado correctamente')
      res.json({ token });
      
    } catch (error) {

      console.log(error);
    }
  };