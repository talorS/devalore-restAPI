const router = require("express").Router();
const petBL = require('../models/petsBL');
const authBL = require('../models/authBL');
const auth = require("../middleware/authJWT");

router.get('/', (req, res, next) => {
  res.redirect('/api-docs');
});

//get all pets end-point
router.get("/pets",auth, async (req, res, next) => {
  const resp = await petBL.getPets(req.query);
  res.status(200).json(resp);
});

//post a pet end-point
router.post("/pet",auth,async (req, res, next) => {
  const resp = await petBL.addPet(req.body);
  res.status(200).json(resp);
});

//delete a pet end-point
router.delete("/pet",auth,async (req, res, next) => {
  const name = req.query.name;
  const resp = await petBL.deletePet(name);
  res.status(200).json(resp);
});

//get the access token
router.get("/token", (req, res, next) => { 
  const resp = authBL.getToken();
  res.status(resp.status).json({token : resp.data});
});

//get all pets ages
router.get("/calculates/pets-ages",auth,async (req, res, next) => { 
  const resp = await petBL.calcAges();
  res.status(200).json({totalAges : resp});
});


router.get("*", function(req, res, next){
  res.redirect('/api-docs');
});


module.exports = router;
