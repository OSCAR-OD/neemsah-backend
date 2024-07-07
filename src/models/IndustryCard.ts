import {Schema, model} from "mongoose";

export enum EType {
    Image = "image",
    Video = "video",
    GIF = "gif",
    TEST = "test",
  }
export interface IIndustryCard {
    _id?: string;
    path: string;
    customID?: string;
    iName?: string;
    icTitle?: string;
    icDescription?: string;
    type: EType;
}
// Create a Schema corresponding to the document interface.
const industryCardSchema = new Schema<IIndustryCard>({
    path: {type: String, trim: true,  required: true},
    iName: {type: String, trim: true},
    icTitle: {type: String, trim: true},
    icDescription: {type: String, trim: true},
    customID: {type: String, trim: true},
    type: { type: String, enum: [EType.Image, EType.Video, EType.GIF,  EType.TEST], required: true },
}, {timestamps: true});

industryCardSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

// Create a Model.
export default model<IIndustryCard>('IndustryCard', industryCardSchema);


