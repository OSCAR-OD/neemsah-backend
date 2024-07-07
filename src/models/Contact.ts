import { Schema, model, Types } from "mongoose";
export enum EType {
    Contact = "contact",
    }
export interface IContact {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    description?: string;
    type?: EType;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const contactSchema = new Schema<IContact>({
    customID: { type: String, trim: true },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
   }, { timestamps: true });

contactSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IContact>('Contact', contactSchema);