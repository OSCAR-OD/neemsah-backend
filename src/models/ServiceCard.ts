import { Schema, model, Types } from "mongoose";
export enum EPosition {
    Service = "service",
    }

export interface IServiceCard {
    _id?: string;
    customID?: string;
    title?: string;
    description?: string;
    images: Types.ObjectId[];
    position: EPosition;
}
// Create a Schema corresponding to the document interface.
const serviceCardSchema = new Schema<IServiceCard>({
    title: {type: String, trim: true},
    description: {type: String, trim: true},
    position:{ type: String, enum: [EPosition.Service ], required: true },
    customID: {type: String, trim: true},
    images: [{ type: Schema.Types.ObjectId, trim: true, required: true, ref: "Media" }],
}, { timestamps: true });

serviceCardSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

// Create a Model.
export default model<IServiceCard>('ServiceCard', serviceCardSchema);


