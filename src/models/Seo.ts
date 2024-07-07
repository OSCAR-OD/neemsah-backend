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
export interface ISeo {
    _id?: string;
    metaTitle: string;
    metaDescription: string;
    position: EPosition;
    customID?: string;

}

// Create a Schema corresponding to the document interface.
const seoSchema = new Schema<ISeo>({

    customID: { type: String, trim: true },
    metaTitle: { type: String, trim: true,required: true },
    metaDescription: { type: String, trim: true,required: true },
    position: { type: String, enum: [EPosition.Overview, EPosition.Stay, EPosition.Dining, EPosition.Wedding, EPosition.WeddingPlan, EPosition.Meeting, EPosition.Promotion, EPosition.Experience, EPosition.Spa, EPosition.Press, EPosition.Testimonials, EPosition.TermCondition, EPosition.Contact, EPosition.FAQ, EPosition.Blog, EPosition.Sitemap,], required: true },

}, { timestamps: true });

seoSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});
export default model<ISeo>('Seo', seoSchema);