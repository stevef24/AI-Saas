import { Schema, model, models } from "mongoose";

import { Document } from "mongoose";

const UserSchema = new Schema({
	clerkId: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	creditBalance: { type: Number, default: 10 },
	planId: { type: Number, default: 1 },
	photo: { type: URL },
});

export interface IUser extends Document {
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
	creditBalance?: number;
	planId?: number;
	photo?: URL;
	username: string;
}

const User = models?.User || model("User", UserSchema);

export default User;
