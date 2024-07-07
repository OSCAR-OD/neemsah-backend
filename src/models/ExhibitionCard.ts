import {Schema, model} from "mongoose";

export enum EType {
    Image = "image",
    Video = "video",
    GIF = "gif",
    TEST = "test",
  }
export interface IExhibitionCard {
    _id?: string;
    path: string;
    customID?: string;
    title?: string;
    division?: string;
    date?: string;    
    headline?: string;
    description?: string;
    type: EType;
}
// Create a Schema corresponding to the document interface.
const exhibitionCardSchema = new Schema<IExhibitionCard>({
    path: {type: String, trim: true,  required: true},
    title: {type: String, trim: true},
    division: {type: String, trim: true},
    date: {type: String, trim: true},
    headline: {type: String, trim: true},
    description: {type: String, trim: true},
    customID: {type: String, trim: true},
    type: { type: String, enum: [EType.Image, EType.Video, EType.GIF,  EType.TEST], required: true },
}, {timestamps: true});

exhibitionCardSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

// Create a Model.
export default model<IExhibitionCard>('ExhibitionCard', exhibitionCardSchema);


