import { Schema, model, Types } from "mongoose";
export interface ICrmRfqType {
    _id?: string;
    rfqType?: string;
    rfqFormat?: string;
    description?: string;
    creationDate?: string;
    createdBy: string;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const CrmRfqTypeSchema = new Schema<ICrmRfqType>({
    customID: { type: String, trim: true },
    rfqType: { type: String, trim: true, required: true },
    rfqFormat: { type: String, trim: true},
    description: { type: String, trim: true },
    creationDate: { type: String, trim: true },
    createdBy: { type: String, trim: true, required: true },
}, { timestamps: true });

CrmRfqTypeSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ICrmRfqType>('CrmRfqType', CrmRfqTypeSchema);