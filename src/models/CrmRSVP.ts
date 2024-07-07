import { Schema, model, Types } from "mongoose";

type IQuestion = {
    title?: string;
    type?: string;
    value?: string;
    options?: string[];
}

type ISection = {
    title?: string;
    questions?: IQuestion[];
}

export interface ICrmRSVP {
    _id?: string;
    rfqTypeID: string;
    title: string;
    description?: string;
    sections?: ISection[];
}

const QuestionSchema = new Schema<IQuestion>({
    title: { type: String, trim: true,},
    type: { type: String, trim: true,},
    value: { type: String, trim: true,},
    options: { type: [String]},
});

const SectionSchema = new Schema<ISection>({
    title: { type: String },
    questions: { type: [QuestionSchema] },
});

const CrmRSVPSchema = new Schema<ICrmRSVP>({
    rfqTypeID: { type: String, required: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    sections: { type: [SectionSchema] },
}, { timestamps: true });

CrmRSVPSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    next();
  });

export default model<ICrmRSVP>('CrmRSVP', CrmRSVPSchema);
