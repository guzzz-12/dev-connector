const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//Crear posts
router.post("/",
  [
    auth,
    check("text", "Text is required").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: req.body.name || user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      const post = await Post.create(newPost);
      res.json(post);
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error")
    }
  }
);

//Obtener todos los posts
router.get("/", auth, async (req, res) => {
  try {
    //Obtener los posts y ordenarlos desde el más reciente
    const posts = await Post.find().sort({date: -1});
    res.json(posts);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error")
  }
});

//Obtener un post por su ID
router.get("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if(!post) {
      return res.status(404).json({msg: "Post not found"})
    }

    res.json(post);
    
  } catch (error) {
    console.log(error.message);
    if(error.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found"})
    }
    res.status(500).send("Server error")
  }
});

//Borrar un post
router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    //Chequear si el post existe
    if(!post) {
      return res.status(404).json({msg: "Post not found"})
    }

    //Chequear si el post pertenece al usuario que trata de eliminarlo
    if(post.user.toString() !== req.user.id) {
      return res.status(401).json({msg: "You can only delete your own posts"})
    }
    
    //Borrar el post
    await Post.deleteOne({user: req.user.id});
    const updatedPosts = await Post.find();

    res.json(updatedPosts);

  } catch (error) {
    console.log(error.message);
    if(error.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found"})
    }
    res.status(500).send("Server error")
  }
});

//Agregar likes a los posts
router.patch("/like/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    //Chequear si el post existe
    if(!post) {
      return res.status(404).json({msg: "Post not found"})
    }

    //Chequear si el usuario ya dio like al post
    const postLikes = post.likes.find(like => {
      return like.user.toString() === req.user.id
    });
    if(postLikes) {
      return res.status(400).json({msg: "Posts can be liked only once"})
    }

    //Agregar el like al post
    post.likes.unshift({user: req.user.id});
    await post.save();

    res.json(post.likes);
    
  } catch (error) {
    console.log(error.message);
    if(error.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found"})
    }
    res.status(500).send("Server error")
  }
});

//Remover likes a los posts
router.patch("/unlike/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    //Chequear si el post existe
    if(!post) {
      return res.status(404).json({msg: "Post not found"})
    }

    //Chequear si el post tiene un like del usuario
    const userLike = post.likes.find(like => {
      return like.user.toString() === req.user.id
    });
    
    //Si el post contiene un like del usuario, removerlo
    if(userLike) {
      const likeIndex = post.likes.indexOf(userLike)
      post.likes.splice(likeIndex, 1);
      await post.save();

      return res.json(post.likes);
    }
    
    res.status(400).json({msg: "You haven't liked this post"})
    
  } catch (error) {
    console.log(error.message);
    if(error.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found"})
    }
    res.status(500).send("Server error")
  }
});

module.exports = router;