import { Schema, models, model, Document } from "mongoose";

export interface ICode extends Document {
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  uniqueCode: string;
}

const CodesSchema = new Schema({
  uniqueCode: { type: String, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Codes = models.Codes || model<ICode>("Codes", CodesSchema);

export default Codes;
