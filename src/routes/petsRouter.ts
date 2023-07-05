import express, { NextFunction, Request, Response } from "express";
import { addPet, calcAges, deletePet, getPets } from '@controller/petsBL';
import { validateGuard, } from "@middleware/validator";
import authGuard from "@middleware/authJWT";
import getToken from "@controller/authBL";

const router = express.Router();

//get all pets end-point
router.get("/pets", authGuard, async (req: Request, res: Response, next: NextFunction) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const resp = await getPets({ page, limit });
  res.status(resp.status).json(resp.data);
});

//post a pet end-point
router.post("/pet", authGuard, async (req: Request, res: Response, next: NextFunction) => {
  const resp = await addPet(req.body);
  res.status(resp.status).json(resp.data);
});

//delete a pet end-point
router.delete("/pet", validateGuard, authGuard, async (req: Request, res: Response, next: NextFunction) => {
  const name = req.query.name as string;
  const resp = await deletePet(name);
  res.status(resp.status).json(resp.data);
});

//get the access token
router.get("/token", (req: Request, res: Response, next: NextFunction) => {
  const resp = getToken();
  res.status(resp.status).json(resp.data);
});

//get all pets ages
router.get("/calculates/pets-ages", authGuard, async (req: Request, res: Response, next: NextFunction) => {
  const resp = await calcAges();
  res.status(resp.status).json(resp.data);
});

export default router;
