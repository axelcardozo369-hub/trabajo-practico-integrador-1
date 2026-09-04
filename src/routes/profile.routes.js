import { Router } from "express";
import { agregarProfile, deleteProfile, todayProfiles, updateProfile, verPorIdProfile } from "../controllers/profile.controllers.js";
import { validate } from "../middleware/validate.js";
import { agregarProfileValidator, deleteProfileValidator, updateProfileValidator, verPorIdProfileValidator } from "../middleware/validations/profile.validation.js";

export const profileRouter = Router();
profileRouter.post("/profiles",agregarProfileValidator,validate,agregarProfile)
profileRouter.delete("/profiles/:id",deleteProfileValidator,validate,deleteProfile)
profileRouter.put("/profiles/:id",updateProfileValidator,validate,updateProfile)
profileRouter.get("/profiles/:id",verPorIdProfileValidator,validate,verPorIdProfile)
profileRouter.get("/profiles",todayProfiles)