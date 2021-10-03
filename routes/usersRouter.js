const router = require("express").Router();
const usrBL = require('../models/usersBL');

router.get('/', (req, res, next) => {
  res.send('Hello There!');
});

//get a user
router.get("/user/:username", (req, res, next) => {
  const id = req.params.username;
  const resp = usrBL.getUser(id);
  res.status(resp.status).json(resp.data);
});

router.get("/users", (req, res, next) => {
  const resp = usrBL.getUsers();
  res.status(200).json(resp);
});

router.get("*", function(req, res, next){
  res.send("Page does not exist!");
});


module.exports = router;
