import { Schema, model, Types } from "mongoose";
import { title } from "process";
export interface ISocialMedia {
    title: string;
    icon: Types.ObjectId;
    btnLink: string;

}
export interface ISetting {
    _id?: string;
    description: string;
    copyright: string;
    headerIcon?: Types.ObjectId;
    favIcon?: Types.ObjectId;
    social: ISocialMedia[];
    customID?: string;

}

// Create a Schema corresponding to the document interface.
const settingSchema = new Schema<ISetting>({

    customID: { type: String, trim: true },
    description: { type: String, trim: true},
    copyright: { type: String, trim: true},
    headerIcon: { type: Schema.Types.ObjectId, trim: true, required: true, ref: "Media" },
    favIcon: { type: Schema.Types.ObjectId, trim: true, ref: "Media" },
    social: [{
        title: { type: String, trim: true, required: true },
        btnLink: { type: String, trim: true, required: true },
        icon: { type: Schema.Types.ObjectId, trim: true, required: true, ref: "Media" }
    }]
}, { timestamps: true });

settingSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ISetting>('Setting', settingSchema);