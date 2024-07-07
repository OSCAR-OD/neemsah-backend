import { Schema, model, Types } from "mongoose";

export enum EPosition {
    Service = "service",
    Cform = "cform",
    AllEmployee= "AllEmployee",
}

export interface IEmployee {
    _id?: string;
    customID?: string;
    position: EPosition;
    image?: Types.ObjectId;
    name?: string;
    designation?: string;
    email?: string;
    phone?: string;
    address?: string;
}

// Create a Schema corresponding to the document interface.
const EmployeeSchema = new Schema<IEmployee>({
    customID: { type: String, trim: true },
    position:{ type: String, enum: [EPosition.Service, EPosition.Cform, EPosition.AllEmployee ], required: true },
    image: { type: Schema.Types.ObjectId, trim: true, required: true, ref: "Media" },
    name: { type: String, trim: true, required: true },
    designation: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    address: { type: String, trim: true },
   }, { timestamps: true });

EmployeeSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IEmployee>('Employee', EmployeeSchema);