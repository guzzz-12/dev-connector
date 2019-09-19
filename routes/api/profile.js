const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//Leer perfil del usuario actual
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        message: "Theres no profile for that user"
      })
    }

    res.json(profile);

  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error")
  }
});

module.exports = router;