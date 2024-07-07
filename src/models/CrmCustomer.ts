import { Schema, model, Types } from "mongoose";
import { title } from "process";
export enum EPosition {
    CrmCustomer = "crmCustomer",
    }
export interface ICrmCustomer {
    _id?: string;
    companyName?: string;
    cid?: string;
    description?: string;
    creationDate?: string;
    images: Types.ObjectId[];
    position: EPosition;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const CrmCustomerSchema = new Schema<ICrmCustomer>({
    customID: { type: String, trim: true },
    companyName: { type: String, trim: true, required: true },
    cid: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    creationDate: { type: String, trim: true },
    position:{ type: String, enum: [EPosition.CrmCustomer ], required: true },
    images: [{ type: Schema.Types.ObjectId, trim: true, required: true, ref: "CTab" }],
}, { timestamps: true });

CrmCustomerSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ICrmCustomer>('CrmCustomer', CrmCustomerSchema);