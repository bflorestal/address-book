import { Request, Response } from "express";
import { Contact } from "./contact.model";

export async function getAllContacts(_req: Request, res: Response) {
  try {
    const contacts = await Contact.find();

    return res.status(200).json(contacts);
  } catch (err) {
    if (err instanceof Error) console.error(`${err.name}: ${err.message}`);

    return res
      .status(500)
      .json({ message: "Impossible de récupérer les contacts" });
  }
}

export async function getContactById(req: Request, res: Response) {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "contact introuvable" });
    }

    return res.status(200).json(contact);
  } catch (err) {
    if (err instanceof Error) console.error(`${err.name}: ${err.message}`);

    return res
      .status(500)
      .json({ message: "Impossible de récupérer le contact" });
  }
}

export async function createContact(req: Request, res: Response) {
  try {
    const contact = await Contact.create(req.body);

    return res.status(201).json(contact);
  } catch (err) {
    if (err instanceof Error) console.error(`${err.name}: ${err.message}`);

    return res.status(500).json({ message: "Impossible de créer le contact" });
  }
}

export async function updateContact(req: Request, res: Response) {
  try {
    return res.status(501).json({ message: "Non implémenté" });
  } catch (err) {
    if (err instanceof Error) console.error(`${err.name}: ${err.message}`);

    return res
      .status(500)
      .json({ message: "Impossible de mettre à jour le contact" });
  }
}

export async function deleteContact(req: Request, res: Response) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!Contact) {
      return res.status(404).json({ message: "contact introuvable" });
    }

    return res.status(200).json(contact);
  } catch (err) {
    if (err instanceof Error) console.error(`${err.name}: ${err.message}`);

    return res
      .status(500)
      .json({ message: "Impossible de supprimer le contact" });
  }
}
