import { Schema, model } from "mongoose";

export enum EType {
    Navbar = "Navbar",
}

export interface INavbar {
    _id?: string;
    industryName: string;
    slug?: string;
    category?: string[];
    type?: EType;
    customID?: string;
    link?: boolean; // Add the link field
}

// Create a Schema corresponding to the document interface.
const NavbarSchema = new Schema<INavbar>({
    customID: { type: String, trim: true },
    industryName: { type: String, trim: true, required: true },
    slug: { type: String, trim: true },
    category: [{ type: String, trim: true }],
    link: { type: Boolean, default: false } 
}, { timestamps: true });

NavbarSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
    const str = this.industryName.toLowerCase();
    const noSpecialChars = str.replace(/[^a-zA-Z0-9 ]/g, '');
    this.slug = noSpecialChars.replace(/\s+/g, '-') + '-' + Math.ceil(Math.random() * 10);
    next();
});

export default model<INavbar>('Navbar', NavbarSchema);