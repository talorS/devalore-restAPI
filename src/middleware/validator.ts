import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

const reporter = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  next();
};

export const validateGuard = [
  check("name")
    .exists()
    .withMessage("delete endPoint requires name in query params!")
    .bail()
    .notEmpty()
    .withMessage("name param should not be empty!")
    .bail(),
  reporter,
];
