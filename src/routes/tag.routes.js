import { Router } from "express";
import { agregarTag, deleteTag, todayTags, updateTag, verPorIdTag } from "../controllers/tag.controllers.js";
import { validate } from "../middleware/validate.js";
import { agregarTagValidator, deleteTagValidator, updateTagValidator, verPorIdTagValidator } from "../middleware/validations/tag.validation.js";
import { verPorIdProfileValidator } from "../middleware/validations/profile.validation.js";

export const tagRouter = Router();
tagRouter.post("/tag", agregarTagValidator,validate, agregarTag);
tagRouter.put("/tag/:id", updateTagValidator,validate, updateTag);
tagRouter.delete("/tag/:id", deleteTagValidator,validate, deleteTag);
tagRouter.get("/tag",todayTags,validate,todayTags);
tagRouter.get("/tag/:id",verPorIdTagValidator ,validate,verPorIdTag);
