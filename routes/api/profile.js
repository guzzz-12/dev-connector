const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const {check, validationResult} = require("express-validator");

//Leer perfil del usuario actual
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        msg: "Theres no profile for that user"
      })
    }

    res.json(profile);

  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error")
  }
});

//Crear perfil de usuario
router.post("/", [auth, [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty()
]], async (req, res) => {
  try {
    //Chequear si hay errores de validación
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    //Extraer los datos del usuario del request
    const {company, website, location, bio, status, githubUsername, skills, youtube, facebook, twitter, linkedin, instagram} = req.body;

    //Crear data del perfil
    const profileFields = {};
    profileFields.user = req.user.id;

    //Chequear si existen los datos del perfil en el request
    company ? profileFields.company = company : null;
    website ? profileFields.website = website : null;
    location ? profileFields.location = location : null;
    bio ? profileFields.bio = bio : null;
    status ? profileFields.status = status : null;
    githubUsername ? profileFields.githubUsername = githubUsername : null;

    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim())
    }

    profileFields.social = {};
    youtube ? profileFields.social.youtube = youtube : null;
    facebook ? profileFields.social.facebook = facebook : null;
    twitter ? profileFields.social.twitter = twitter : null;
    linkedin ? profileFields.social.linkedin = linkedin : null;
    instagram ? profileFields.social.instagram = instagram : null;
    
    //Chequear si el perfil existe en la base de datos
    let profile = await Profile.findOne({user: req.user.id});

    //Si existe, actualizarlo
    if(profile) {
      profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      );
      return res.json(profile)
    }

    //Si no existe el perfil, crearlo
    profile = await Profile.create(profileFields);
    return res.json(profile);

  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error")
  }
});

//Obtener todos los perfiles de los usuarios
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);

  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error")
  }
});

//Obtener el perfil de un usuario
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.userId}).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(404).json({
        msg: "No profile for that user"
      })
    }
    res.json(profile);

  } catch(error) {
    console.error(error.message);
    //Mensaje de error cuando la id no corresponde con el formato de las ids de la base de datos
    if(error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "No profile for that user"
      })
    }
    res.status(500).send("Server error")
  }
})

module.exports = router;