import { Schema, model, Types } from "mongoose";
import { title } from "process";

export interface ICrmContact {
    _id?: string;
    contactName?: string;
    companyName?: string;
    cid?: string;
    contactPhone?: string;
    contactEmail?: string;
    designation?: string;
    note?: string;
    addedBy?: string;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const CrmContactSchema = new Schema<ICrmContact>({
    customID: { type: String, trim: true },
    contactName: { type: String, trim: true, required: true },
    companyName: { type: String, trim: true, required: true },
    cid: { type: String, trim: true, required: true },
    contactPhone: { type: String, trim: true, required: true },
    contactEmail: { type: String, trim: true },
    designation: { type: String, trim: true },
    note: { type: String, trim: true },
    addedBy: { type: String, trim: true, required: true },
}, { timestamps: true });

CrmContactSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ICrmContact>('CrmContact', CrmContactSchema);