import { Schema, model, Types } from "mongoose";
export enum EPosition {
    Rawm = "rawm",
    }

export interface IRaw {
    _id?: string;
    tbName?: string;
    eventKey?: string;
    division?: string;
    tbTitle?: string;
    link?: string;
    images: Types.ObjectId[];
    position: EPosition;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const rawSchema = new Schema<IRaw>({
    tbName: { type: String, trim: true, required: true },
    eventKey: { type: String, trim: true, required: true },
    division: { type: String, trim: true, required: true },
    tbTitle: { type: String, trim: true, required: true },
    link: { type: String, trim: true },
    images: [{ type: Schema.Types.ObjectId, trim: true, required: true, ref: "RTab" }],
    position:{ type: String, enum: [EPosition.Rawm ], required: true },
    customID: { type: String, trim: true },
}, { timestamps: true });

rawSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IRaw>('Raw', rawSchema);