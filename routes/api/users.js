const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require("config");
const jwt_secret = process.env.JWT_SECRET;

//Registrar un nuevo usuario
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please, include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try {
      //Chequear si el usuario existe
      const {name, email, password} = req.body;
      let user = await User.findOne({email: email});
      if(user) {
        return res.status(400).json({
          errors: [{msg: "User already exists"}]
        })
      }

      //Crear el usuario con el gravatar y la data del request
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      user = new User({
        name,
        email,
        password,
        avatar
      })
  
      //Encryptar la contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
  
      //Retornar un jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, jwt_secret, {
        expiresIn: 3600
      }, (error, token) => {
        if (error) {
          throw error;
        }
        res.json({token: token})
      });

    } catch(error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;