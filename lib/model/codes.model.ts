import { Schema, models, model, Document } from "mongoose";

export interface ICode extends Document {
  used: boolean;
  createdAt: Date;
  code: string;
}

const CodesSchema = new Schema({
  code: { type: String, unique: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Codes = models.Codes || model<ICode>("Codes", CodesSchema);

export default Codes;
