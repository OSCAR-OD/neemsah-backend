import { Schema, model, Types } from "mongoose";
export interface IGallery {
  _id?: string;
  images: Types.ObjectId[];
  customID?: string;
}
// Create a Schema corresponding to the document interface.
const gallerySchema = new Schema<IGallery>(
  {
    customID: { type: String, trim: true },
    images: [{ type: Schema.Types.ObjectId, required: true, ref: "Media" }],
  },
  { timestamps: true }
);

gallerySchema.pre("save", function (next) {
  const date = new Date();
  const random = Math.floor(Math.random() * 10000 + 1);
  this.customID = `NM${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
  next();
});

// Create a Model.
export default model<IGallery>("Gallery", gallerySchema);
