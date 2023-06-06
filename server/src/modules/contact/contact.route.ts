import { Router } from "express";

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "./contact.controller";

const router = Router();

router
  .get("/contacts", getAllContacts)
  .get("/contacts/:id", getContactById)
  .post("/contacts", createContact)
  .put("/contacts/:id", updateContact)
  .delete("/contacts/:id", deleteContact);

export { router as contactRouter };
