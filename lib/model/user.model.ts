  import { Schema, model, models, Document } from "mongoose";

  export interface IUser extends Document {
    clerkId: string;
    name: string;
    email: string;
    image?: string;
    joinedAt: Date;
    code: string;
    admin: boolean;
  }

  const UserSchema = new Schema({
    clerkId: String,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    code: String,
    admin: { type: Boolean, default: undefined },
    joinedAt: { type: Date, default: Date.now },
  });

  const User = models.User || model<IUser>("User", UserSchema);

  export default User;
