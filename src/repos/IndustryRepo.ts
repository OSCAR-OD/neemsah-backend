import Repo from "@repos/Repo";
import Industry, { IIndustry } from "@models/Industry";
import IndustryPage, { IIndustryPage } from "@models/IndustryPage";
import RefferenceImage, { IRefferenceImage } from "@models/RefferenceImage";

class IndustryRepo extends Repo {
    constructor() {
        super(Industry);
    }
    public async allIndustryNav(): Promise<IIndustry[]> {
        return (await Industry.find().populate({
            path: 'parent',
            select: 'name slug customID'
        })
            .populate({
                path: 'grandParent',
                select: 'name slug customID'
            })
            .select("-__v")
            .sort({ createdAt: 'asc' })
        );
    };
    public async create(data: IIndustry): Promise<IIndustry> {
        const industry = new Industry(data);
        await industry.save();
        return industry;
    }
    public async createIndustryPage(data: IIndustryPage): Promise<IIndustryPage> {
        const industryPage = new IndustryPage(data);
        return (await industryPage.save());
    }
    public async singleByIndustryID(industryID: string): Promise<IIndustryPage> {
        return await IndustryPage.findOne({ industryID })
            .populate({
                path: 'heroImage industryImage refLayoutImage processes.prImage refLayoutMachinePositions.poImage',
                select: 'path customID _id'
            })
            .select("-__v");
    }
    public async getGrandParent(): Promise<IIndustry[]> {
        return await Industry.find({ grandParent: null }).select('name slug customID');
    }
    public async getChildrenOfGrandParent(grandParentId: string): Promise<IIndustry[]> {
        return await Industry.find({ grandParent: grandParentId, parent:null }).select('name slug customID');
    }
    public async bulkInsertRefferenceImage(data: IRefferenceImage[]): Promise<IRefferenceImage[]> {
        const referenceImageRepo = new Repo(RefferenceImage);
        return await referenceImageRepo.bulkInsert(data);
    }
    public async allRefferenceImage(): Promise<any[]> {
        return (await RefferenceImage.find().select('-__v').sort({ createdAt: 'desc' }));
    }
}
export default new IndustryRepo();