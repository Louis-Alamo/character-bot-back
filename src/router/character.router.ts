import { Router } from "express";
import { createCharacter } from "../controller/character.controller";
import { validateCreateCharacter } from "../middleware/character.middleware";

const router = Router();


router.post("/", validateCreateCharacter, createCharacter);

export default router;