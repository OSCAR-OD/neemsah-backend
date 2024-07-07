import { Schema, model, Types } from "mongoose";
export enum EType {
    Ticket = "ticket",
}

export interface ITicket {
    _id?: string;
    service?: string;
    description?: string;
    serial?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    type?: EType;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicket>({
    customID: { type: String, trim: true },
    service: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    serial: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    company: { type: String, trim: true, required: true },
}, { timestamps: true });

ticketSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ITicket>('Ticket', ticketSchema);