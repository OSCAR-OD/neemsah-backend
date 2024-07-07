import { Schema, model, Types } from "mongoose";

type Process = {
  title: string;
  description?: string;
  prImage?: Types.ObjectId;
}

type Position = {
  x: number;
  y: number;
  title?: string;
  description?: string;
  poImage?: Types.ObjectId;
}

export interface IIndustryPage {
  _id?: string;
  industryID?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: Types.ObjectId;
  industryImage?: Types.ObjectId;
  industryDescription?: string;
  productionProcessTitle?: string;
  productionProcessSubTitle?: string;
  processStart: Process;
  processEnd: Process;
  processes: Process[];
  refLayoutTitle: string;
  refLayoutImage: Types.ObjectId;
  refLayoutMachinePositions: Position[];
}

const processSchema = new Schema<Process>({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  prImage: { type: Schema.Types.ObjectId, ref: "RefferenceImage" }
});

const positionSchema = new Schema<Position>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  poImage: { type: Schema.Types.ObjectId, ref: "RefferenceImage" }
});

const industryPageSchema = new Schema<IIndustryPage>({
  industryID: { type: String, trim: true },
  heroTitle: { type: String, trim: true },
  heroDescription: { type: String, trim: true },
  heroImage: { type: Schema.Types.ObjectId, ref: "RefferenceImage" },
  industryImage: { type: Schema.Types.ObjectId, ref: "RefferenceImage" },
  industryDescription: { type: String, trim: true },
  productionProcessTitle: { type: String, trim: true },
  productionProcessSubTitle: { type: String, trim: true },
  processStart: {
    title: {type: String, trim: true},
    description: {type: String, trim: true},
  },
  processEnd: {
    title: {type: String, trim: true},
    description: {type: String, trim: true},
  },
  processes: [processSchema],
  refLayoutTitle: { type: String, trim: true, required: true },
  refLayoutImage: { type: Schema.Types.ObjectId, ref: "RefferenceImage", required: true },
  refLayoutMachinePositions: [positionSchema]
}, { timestamps: true });

industryPageSchema.pre('save', function (next) {
  const date = new Date();
  const random = Math.floor((Math.random() * 10000) + 1);
  next();
});

export default model<IIndustryPage>('IndustryPage', industryPageSchema);