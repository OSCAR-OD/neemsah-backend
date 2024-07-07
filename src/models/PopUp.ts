import { Schema, model, Types } from "mongoose";
import { title } from "process";
export enum EPosition {
    Overview = "overview",
    Stay = "stay",
    Dining = "dining",
    Wedding = "wedding",
    WeddingPlan = "weddingPlan",
    Meeting = "meeting",
    Promotion = "promotion",
    Experience = "experience",
    Spa = "spa",
    Press = "press",
    Testimonials = "testimonials",
    TermCondition = "term_condition",
    Contact = "contact",
    FAQ = "faq",
    Blog = "blog",
    Sitemap = "sitemap",
}
export interface IPopUp {
    _id?: string;
    title: string;
    link: string;
    image?: Types.ObjectId;
    position: EPosition;
    customID?: string;

}

// Create a Schema corresponding to the document interface.
const popUpSchema = new Schema<IPopUp>({

    customID: { type: String, trim: true },
    title: { type: String, trim: true },
    link: { type: String, trim: true },
    position: { type: String, enum: [EPosition.Overview, EPosition.Stay, EPosition.Dining, EPosition.Wedding, EPosition.WeddingPlan, EPosition.Meeting, EPosition.Promotion, EPosition.Experience, EPosition.Spa, EPosition.Press, EPosition.Testimonials, EPosition.TermCondition, EPosition.Contact, EPosition.FAQ, EPosition.Blog, EPosition.Sitemap,], required: true },
    image: { type: Schema.Types.ObjectId, trim: true, required: true, ref: "Media" },

}, { timestamps: true });

popUpSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<IPopUp>('PopUp', popUpSchema);