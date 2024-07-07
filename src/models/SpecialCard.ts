import {Schema, model} from "mongoose";

export enum EType {
    Image = "image",
    Video = "video",
    GIF = "gif",
    TEST = "test",
  }
export interface ISpecialCard {
    _id?: string;
    path: string;
    customID?: string;
    scTitle?: string;
    scDescription?: string;
    type: EType;
}
// Create a Schema corresponding to the document interface.
const specialCardSchema = new Schema<ISpecialCard>({
    path: {type: String, trim: true,  required: true},
    scTitle: {type: String, trim: true},
    scDescription: {type: String, trim: true},
    customID: {type: String, trim: true},
    type: { type: String, enum: [EType.Image, EType.Video, EType.GIF,  EType.TEST], required: true },
}, {timestamps: true});

specialCardSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

// Create a Model.
export default model<ISpecialCard>('SpecialCard', specialCardSchema);


