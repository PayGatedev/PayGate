import { Router, Request, Response, NextFunction } from "express";
import { createContentSchema } from "../validators/content";
import { createContent } from "../services/content/create";
import { getContentByCreator } from "../services/content/getContentByCreator";
import { getAllContent } from "../services/content/getAllContent";
import Joi from "joi";
import { getContentById } from "../services/content/getContentById";

const router = Router();

function validateBody(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.error("--- JOI VALIDATION ERROR ---");
      console.error("Timestamp:", new Date().toISOString());
      console.error("Route:", req.method, req.originalUrl);
      console.error("Request Body:", JSON.stringify(req.body, null, 2));
      console.error("Validation Details:");
      error.details.forEach((detail) => {
        const path = detail.path.join('.') || 'N/A (overall object issue)';
        console.error(`  - Path: ${path}`);
        console.error(`    Message: ${detail.message}`);
        console.error(`    Type: ${detail.type}`);
        if (detail.context) {
          if (detail.context.key) console.error(`    Key: ${detail.context.key}`);
        }
      });
      console.error("--- END JOI VALIDATION ERROR ---");

      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
}

router.post("/create", validateBody(createContentSchema), async (req: Request, res: Response) => {
  try {
    const { walletAddress, ...payloadFromReqBody } = req.body;
    const createdDocument = await createContent(walletAddress, payloadFromReqBody as any); 
    res.status(201).json(createdDocument);
  } catch (err: any) {
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("Error in /create route handler:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/by-creator/:walletAddress", async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({ message: "Creator wallet address parameter is required." });
    }

    const contentItems = await getContentByCreator(walletAddress);
    res.status(200).json(contentItems);

  } catch (err: any) {
    console.error(`Error fetching content for creator ${req.params.walletAddress}:`, err);
    res.status(500).json({ message: "Internal server error while fetching creator content." });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const allContentItems = await getAllContent();
    res.status(200).json(allContentItems);
  } catch (err: any) {
    console.error("Error fetching all content:", err);
    res.status(500).json({ message: err.message || "Internal server error while fetching all content." });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contentItem = await getContentById(id);

    if (!contentItem) {
      return res.status(404).json({ message: "Content not found." });
    }

    res.status(200).json(contentItem);

  } catch (err: any) {
    console.error(`Error fetching content with ID ${req.params.id}:`, err);
    if (err.message && err.message.includes("Invalid content ID format")) {
        return res.status(400).json({ message: "Invalid content ID format." });
    }
    res.status(500).json({ message: err.message || "Internal server error while fetching content." });
  }
});


export { router as contentRouter };