import { Schema, model, models } from "mongoose";

import { Document } from "mongoose";

const ImageSchema = new Schema({
	title: { type: String, required: true },
	transformationTypes: { type: String, required: true },
	publicId: { type: String, required: true },
	secureUrl: { type: String, required: true },
	width: { type: Number },
	height: { type: Number },
	config: { type: Object },
	transformationUrl: { type: URL },
	aspectRation: { type: String },
	prompt: { type: String },
	author: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export interface IImage extends Document {
	title: string;
	transformationTypes: string;
	publicId: string;
	secureUrl: string;
	width?: number;
	height?: number;
	config?: object;
	transformationUrl?: URL;
	aspectRation?: string;
	prompt?: string;
	author: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	createdAt: Date;
	updatedAt: Date;
}

const Image = models?.Image || model("Image", ImageSchema);

export default Image;
