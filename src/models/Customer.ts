import { Schema, model, Types } from "mongoose";
import { title } from "process";
export enum EPosition {
    Customer = "customer",
    }
export interface ICustomer {
    _id?: string;
    name?: string;
    eventKey?: string;    
    images: Types.ObjectId[];
    position: EPosition;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const customerSchema = new Schema<ICustomer>({
    customID: { type: String, trim: true },
    name: { type: String, trim: true, required: true },
    eventKey: { type: String, trim: true },
    position:{ type: String, enum: [EPosition.Customer ], required: true },
    images: [{ type: Schema.Types.ObjectId, trim: true, required: true, ref: "CTab" }],
}, { timestamps: true });

customerSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ICustomer>('Customer', customerSchema);