const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const recipeData = data.recipes;

router.get("/", async (req, res) => {
    try {
      const userList = await userData.getAllUsers();
      res.json(userList);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const user = await userData.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });
  
  router.post("/", async (req, res) => {
    const userInfo = req.body;
    try {
      let count = Object.keys(userInfo).length;
      if(count!=6){
        throw "invalid JSON format";
      }  
      if (!userInfo.username) {
        throw "You must provide a name";
      }  
      if (!userInfo.email) {
        throw "You must provide an email";
      }
      if(!userInfo.firstName){
        throw "You must provide a first name";
      }
      if(!userInfo.lastName){
        throw "You must provide a last name";
      }
      if(!userInfo.password){
        throw "You must provide a password";
      }
      if(!userInfo.birthday){
        throw "You must provide a birthday";
      }
      const newuser = await userData.create(
        userInfo.username,
        userInfo.email,
        userInfo.firstName,
        userInfo.lastName,
        userInfo.password,
        userInfo.birthday
      );
      res.status(200).json(newuser);
    } catch (e) {
      res.status(400).json({error: e});
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const user = await userData.getUserById(req.params.id);
      await userData.removeUser(req.params.id);
      const recipeList = await recipeData.getAllRecipes();
      const userPosts = [];
      user.posts = userPosts;
      for(let p = 0; p<postsList.length; p++){
        if(postsList[p].author==user._id.toString()){
          const userPost = {};
          userPost._id = postsList[p]._id;
          userPost.title = postsList[p].title;
          user.posts.push(userPost);
          await postData.removePost(postsList[p]._id.toString());
        }
      }
      res.json(user);
    } catch (e) {
      res.status(404).json({error: e});
      return;
    }
  });
  
  module.exports = router;
