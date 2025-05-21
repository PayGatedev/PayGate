import { Router, Request, Response, NextFunction } from "express";
import { createContentSchema } from "../validators/content";
import { createContent } from "../services/content/create";
import Joi from "joi";

const router = Router();

function validateBody(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
}

router.post("/create", validateBody(createContentSchema), async (req, res) => {
  try {
    const { walletAddress, ...payload } = req.body;
    const doc = await createContent(walletAddress, payload);
    res.status(201).json(doc);
  } catch (err: any) {
    if (err.message === "Creator not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "Unsupported content kind") {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export {router as contentRouter};
