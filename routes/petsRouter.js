const router = require("express").Router();
const petBL = require('../models/petsBL');
const authBL = require('../models/authBL');
const auth = require("../middleware/authJWT");

router.get('/', (req, res, next) => {
  res.send('Welcome to Pets Service!');
});

//get all pets
router.get("/pets",auth, async (req, res, next) => {
  const resp = await petBL.getPets(req.query);
  res.status(200).json(resp);
});

//post a pet
router.post("/pet",auth,async (req, res, next) => {
  const obj = req.body;
  const resp = await petBL.addPet(obj);
  res.status(200).json(resp);
});

//delete a pet
router.delete("/pet",auth,async (req, res, next) => {
  const name = req.query.name;
  const resp = await petBL.deletePet(name);
  res.status(200).json(resp);
});

//get the token
router.get("/token", (req, res, next) => { 
  res.status(200).json({token : authBL.getToken()});
});

//get the pets-ages
router.get("/calculates/pets-ages",auth,async (req, res, next) => { 
  const resp = await petBL.calcAges();
  res.status(200).json({totalAges : resp});
});


router.get("*", function(req, res, next){
  res.send("Page does not exist!");
});


module.exports = router;
