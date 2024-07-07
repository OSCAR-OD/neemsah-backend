import {Schema, model} from "mongoose";

export enum EType {
    Image = "image",
    Video = "video",
    GIF = "gif",
    TEST = "test",
  }
export interface IMedia {
    _id?: string;
    path: string;
    customID?: string;
    caption?: number;
    description?: string;
    type: EType;
}
// Create a Schema corresponding to the document interface.
const mediaSchema = new Schema<IMedia>({
    path: {type: String, trim: true,  required: true},
    caption: {type: String, trim: true},
    description: {type: String, trim: true},
    customID: {type: String, trim: true},
    type: { type: String, enum: [EType.Image, EType.Video, EType.GIF,  EType.TEST], required: true },
}, {timestamps: true});

mediaSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

// Create a Model.
export default model<IMedia>('Media', mediaSchema);


