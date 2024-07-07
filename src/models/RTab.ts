import { Schema, model, Types } from "mongoose";

export enum EType {
    Image = "image",
    Video = "video",
    GIF = "gif",
    TEST = "test",
  }

export interface IRTab {
    _id?: string;
    path: string;
    customID?: string;
    type: EType;
    title?: string;
    description?: string;
    corigin?: string;
    }

// Create a Schema corresponding to the document interface.
const rTabSchema = new Schema<IRTab>({
    path: {type: String, trim: true,  required: true},
    customID: { type: String, trim: true },
    type: { type: String, enum: [EType.Image, EType.Video, EType.GIF,  EType.TEST], required: true },
    title: { type: String, trim: true, required: true },    
    description: { type: String, trim: true, },
    corigin: { type: String, trim: true, },
    }, { timestamps: true });

rTabSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IRTab>('RTab', rTabSchema);