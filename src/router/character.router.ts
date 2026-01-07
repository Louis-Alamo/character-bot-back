import { Router } from "express";
import { createCharacter, getAllCharacters, getCharacterById, updateCharacter, deleteCharacter } from "../controller/character.controller";
import { validateCreateCharacter, validateUpdateCharacter } from "../middleware/character.middleware";

const router = Router();


router.post("/", validateCreateCharacter, createCharacter);
router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.put("/:id", validateUpdateCharacter, updateCharacter);
router.delete("/:id", deleteCharacter);


export default router;