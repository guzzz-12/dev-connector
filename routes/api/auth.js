const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const {check, validationResult} = require("express-validator");
// const config = require("config");
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//Tomar la data del usuario actualmente logueado
router.get("/", auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("-password");
    const user = await User.findById(req.user.id);

    res.json({
      user: user
    });

  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error")
  }
});

//Login de usuarios
router.post("/", [
  check("email", "Please, include a valid email").isEmail(),
  check("password", "Password is required").exists()
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  try {
    //Chequear si los datos ingresados son correctos
    const {email, password} = req.body;
    let user = await User.findOne({email: email});
    if(!user) {
      return res.status(400).json({
        errors: [{msg: "Wrong email or password"}]
      })
    }

    //Chequear sin la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [{msg: "Wrong email or password"}]
      })
    }

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