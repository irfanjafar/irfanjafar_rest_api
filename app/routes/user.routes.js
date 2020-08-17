module.exports = (app) => {
  const users = require("../controllers/user.controllers");
  let router = require("express").Router();

  //create new user
  router.post("/signup", users.signup);
  router.post("/signin", users.signin);

  app.use("/api/users", router);
};
