import { Schema, model, Types } from "mongoose";
import { title } from "process";
export enum EPosition {
    Home = "home",
    About = "about",
    Business = "business",
    Message = "message",
    Organogram = "organogram",
    Service = "service",
    Contact = "contact",
    Cform = "cform",
    Rawm = "rawm",
    Principal = "principal",
    Customer = "customer",
    Career = "career",
    }
export interface IHero {
    _id?: string;
    title: string;
    link?: string;
    image?: Types.ObjectId;
    description?: string;
    position: EPosition;
    customID?: string;
}

// Create a Schema corresponding to the document interface.
const heroSchema = new Schema<IHero>({
    customID: { type: String, trim: true },
    title: { type: String, trim: true, required: true },
    link: { type: String, trim: true },
    position:{ type: String, enum: [EPosition.Home, EPosition.About, EPosition.Business, EPosition.Message, EPosition.Organogram, EPosition.Service, EPosition.Contact, EPosition.Cform, EPosition.Rawm, EPosition.Principal, EPosition.Customer, EPosition.Career ], required: true },
    image: { type: Schema.Types.ObjectId, trim: true, required: true, ref: "Media" },
    description: {type: String, trim: true},
}, { timestamps: true });

heroSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IHero>('Hero', heroSchema);