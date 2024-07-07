import { Schema, model, Types } from "mongoose";

type IQuestion = {
    title?: string;
    type?: string;
    value?: string;
    options?: string[];
};

type ISection = {
    title?: string;
    questions?: IQuestion[];
};

type IMachineInformation = {
    title: string;
    speed: string;
    fillingVolume: string;
    fillingAccuracy: string;
    foilSpecification: string;
    packetType: string;
    remarks: string;
};

type IRSVPData = {
    rfqTypeID: string;
    title: string;
    description?: string;
    sections?: ISection[];
};
type IFinanceInformation = {
    visitType?: string;
    visitPlace?: string;
    totalCost?: string;
    travelCost?: string;
    foodCost?: string;
    accommodationCost?: string;
    otherCost?: string;
    extraCostReason?: string;
};

export interface IVisitReport {
    _id?: string;
    cid: string;
    companyName: string;
    personContact: string;
    pid: string;
    projectName: string;
    application: string;
    flags: string;
    createdBy: string;
    description: string;
    nextFollowUpDate: string;
    deadline: string;
    rfqType: string;
    rsvpData: IRSVPData;
    machineInformation: IMachineInformation[];
    financeInformation: IFinanceInformation;
    claimedBy?: string;
    status?: string;
    path?: string;
    comments?: string;
    customID?: string;
}

const QuestionSchema = new Schema<IQuestion>({
    title: { type: String, trim: true },
    type: { type: String, trim: true },
    value: { type: String, trim: true },
    options: { type: [String] },
});

const SectionSchema = new Schema<ISection>({
    title: { type: String, trim: true },
    questions: { type: [QuestionSchema] },
});

const RSVPDataSchema = new Schema<IRSVPData>({
    rfqTypeID: { type: String, trim: true},
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    sections: { type: [SectionSchema] },
}, { timestamps: true });

const MachineInformationSchema = new Schema({
    title: { type: String, trim: true },
    speed: { type: String, trim: true },
    fillingVolume: { type: String, trim: true },
    fillingAccuracy: { type: String, trim: true },
    foilSpecification: { type: String, trim: true },
    packetType: { type: String, trim: true },
    remarks: { type: String, trim: true },
});

const FinanceInformationSchema = new Schema<IFinanceInformation>({
    visitType: { type: String, trim: true},
    visitPlace: { type: String, trim: true},
    totalCost: { type: String, trim: true},
    travelCost: { type: String, trim: true},
    foodCost: { type: String, trim: true},
    accommodationCost: { type: String, trim: true},
    otherCost: { type: String, trim: true},
    extraCostReason: { type: String, trim: true},
}, { timestamps: true });



const VisitReportSchema = new Schema<IVisitReport>({
    cid: { type: String, trim: true },
    companyName: { type: String, trim: true },
    pid: { type: String, trim: true },
    projectName: { type: String, trim: true },
    personContact: { type: String, trim: true },
    application: { type: String, trim: true },
    flags: { type: String, trim: true },
    createdBy: { type: String, trim: true, required: true, },
    description: { type: String, trim: true, required: true, },
    nextFollowUpDate: { type: String, trim: true, required: true, },
    deadline: { type: String,  trim: true },
    rfqType: { type: String,  trim: true },
    rsvpData: { type: RSVPDataSchema },
    machineInformation: { type: [MachineInformationSchema] },
    financeInformation: { type: FinanceInformationSchema },
    claimedBy: { type: String,  trim: true },
    status: { type: String,  trim: true },
    path: {type: String, trim: true,},
    comments: { type: String},
    customID: { type: String, trim: true },
}, { timestamps: true });

VisitReportSchema.pre('save', function (next) {
    const date = new Date();
    const random = Math.floor((Math.random() * 10000) + 1);
    this.customID = `NM${date.getDate()}${date.getMonth()}${date.getFullYear()}${random}`;
    next();
});

export default model<IVisitReport>('VisitReport', VisitReportSchema);
