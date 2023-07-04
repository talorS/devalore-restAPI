import express, { NextFunction, Request, Response } from "express";
import { addPet, calcAges, deletePet, getPets } from '@controller/petsBL';
import auth from "@middleware/authJWT";
import getToken from "@controller/authBL";

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/api-docs');
});

//get all pets end-point
router.get("/pets", auth, async (req: Request, res: Response, next: NextFunction) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const resp = await getPets({ page, limit });
  res.status(200).json(resp);
});

//post a pet end-point
router.post("/pet", auth, async (req: Request, res: Response, next: NextFunction) => {
  const resp = await addPet(req.body);
  res.status(200).json(resp);
});

//delete a pet end-point
router.delete("/pet", auth, async (req: Request, res: Response, next: NextFunction) => {
  const name = req.query.name as string;
  const resp = await deletePet(name);
  res.status(200).json(resp);
});

//get the access token
router.get("/token", (req: Request, res: Response, next: NextFunction) => {
  const resp = getToken();
  res.status(resp.status).json({ token: resp.data });
});

//get all pets ages
router.get("/calculates/pets-ages", auth, async (req: Request, res: Response, next: NextFunction) => {
  const resp = await calcAges();
  res.status(200).json({ totalAges: resp });
});


router.get("*", function (req: Request, res: Response, next: NextFunction) {
  res.redirect('/api-docs');
});


export default router;
