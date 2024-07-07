import { Schema, model, Types } from "mongoose";
import { title } from "process";

export interface ITestQR {
    _id?: string;
    title?: string;
    link: string;
    type: string;
    customID?: string;

}

// Create a Schema corresponding to the document interface.
const TestQRSchema = new Schema<ITestQR>({

    customID: { type: String, trim: true },
    title: { type: String, trim: true },
    link: { type: String, trim: true },
    type: { type: String, trim: true },


}, { timestamps: true });

TestQRSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ITestQR>('TestQR', TestQRSchema);