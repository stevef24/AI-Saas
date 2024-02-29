import { Schema, model, models } from "mongoose";

import { Document } from "mongoose";

const UserSchema = new Schema({
	clerkId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	photo: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	planId: {
		type: Number,
		default: 1,
	},
	creditBalance: {
		type: Number,
		default: 10,
	},
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
