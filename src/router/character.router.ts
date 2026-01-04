import { Router } from "express";
import { createCharacter, getAllCharacters } from "../controller/character.controller";
import { validateCreateCharacter } from "../middleware/character.middleware";

const router = Router();


router.post("/", validateCreateCharacter, createCharacter);
router.get("/", getAllCharacters);


export default router;