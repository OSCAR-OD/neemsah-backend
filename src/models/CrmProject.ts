import { Schema, model, Types } from "mongoose";
import { title } from "process";

export interface ICrmProject {
    _id?: string;
    pid: string;
    projectName?: string;
    cid?: string;
    companyName?: string;
    application?: string;
    assignedEmployee?: string;
    initiationDate?: string;
    description?: string;
    createdBy?: string;
    lastEditedBy?: string;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const CrmProjectSchema = new Schema<ICrmProject>({
    customID: { type: String, trim: true },
    pid: { type: String, trim: true, required: true },
    projectName: { type: String, trim: true, required: true },
    cid: { type: String, trim: true },
    companyName: { type: String, trim: true },
    application: { type: String, trim: true },
    assignedEmployee: { type: String, trim: true },
    initiationDate: { type: String, trim: true },
    description: { type: String, trim: true },
    createdBy: { type: String, trim: true },
    lastEditedBy: { type: String, trim: true },
}, { timestamps: true });

CrmProjectSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ICrmProject>('CrmProject', CrmProjectSchema);