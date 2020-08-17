module.exports = (app) => {
  const posts = require("../controllers/post.controllers");
  const auth = require("../middleware/auth");
  let router = require("express").Router();

  //create new post
  router.post("/add", posts.create);
  router.get("/cari", posts.findAll);
  router.put("/edit/:id", posts.edit);

  //router.put("/image-photo/:id/:name", posts.uploadImagePost);

  app.use("/api/posts", auth.isAuth, router);
};
