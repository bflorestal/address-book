import { Schema, model } from "mongoose";

export interface IContact {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  entreprise: string;
  siteWeb: string;
  note: string;
}

const contactSchema = new Schema<IContact>({
  prenom: { type: String, required: true, minlength: 2, maxlength: 100 },
  nom: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, minlength: 5, maxlength: 100 },
  telephone: { type: String, required: true, minlength: 10, maxlength: 20 },
  adresse: { type: String, required: true, minlength: 2, maxlength: 200 },
  entreprise: { type: String, required: true, minlength: 2, maxlength: 200 },
  siteWeb: { type: String, required: true, minlength: 2, maxlength: 200 },
  note: { type: String, required: true, minlength: 2, maxlength: 1000 },
});

export const Contact = model<IContact>("Contact", contactSchema);
