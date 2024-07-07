import { Schema, model, Types } from "mongoose";

export interface IIndustry {
    _id?: string;
    customID?: string;
    name?: string;
    slug?: string;
    grandParent?: Types.ObjectId | null;
    parent?: Types.ObjectId | null;
}
// Create a Schema corresponding to the document interface.
const industrySchema = new Schema<IIndustry>({
    name: {type: String, trim: true},
    slug: {type: String, trim: true},
    customID: {type: String, trim: true},
    grandParent: { type: Types.ObjectId, ref: 'Industry', default: null },
    parent: { type: Types.ObjectId, ref: 'Industry', default: null },
}, { timestamps: true });

industrySchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

// Create a Model.
export default model<IIndustry>('Industry', industrySchema);


