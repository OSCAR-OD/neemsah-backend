import { Schema, model, Types } from "mongoose";

export enum EType {
    Image = "image",
    Video = "video",
    GIF = "gif",
    TEST = "test",
  }

export interface IPTab {
    _id?: string;
    path: string;
    customID?: string;
    type: EType;
    name?: string;
    eventKey?: string;
}

// Create a Schema corresponding to the document interface.
const ptabSchema = new Schema<IPTab>({
    path: {type: String, trim: true,  required: true},
    customID: { type: String, trim: true },
    type: { type: String, enum: [EType.Image, EType.Video, EType.GIF,  EType.TEST], required: true },
    name: { type: String, trim: true, required: true },    
    eventKey: { type: String, trim: true, },
    }, { timestamps: true });

ptabSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IPTab>('PTab', ptabSchema);