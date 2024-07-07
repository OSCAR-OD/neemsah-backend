import { Schema, model, Types } from "mongoose";
import { title } from "process";
export enum EPosition {
    Principal = "principal",
    }
export interface IPrincipal {
    _id?: string;
    name?: string;
    eventKey?: string;    
    images: Types.ObjectId[];
    position: EPosition;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const principalSchema = new Schema<IPrincipal>({
    customID: { type: String, trim: true },
    name: { type: String, trim: true, required: true },
    eventKey: { type: String, trim: true },
    position:{ type: String, enum: [EPosition.Principal ], required: true },
    images: [{ type: Schema.Types.ObjectId, trim: true, required: true, ref: "PTab" }],
}, { timestamps: true });

principalSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IPrincipal>('Principal', principalSchema);