import Repo from "@repos/Repo";
import Footer, { IFooter } from "@models/Footer";

class FooterRepo extends Repo {
    constructor() {
        super(Footer);
    }
    public async allFooterNav(): Promise<IFooter[]> {
        return (await Footer.find().populate({
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
    public async create(data: IFooter): Promise<IFooter> {
        const industry = new Footer(data);
        await industry.save();
        return industry;
    }
    public async getGrandParent(): Promise<IFooter[]> {
        return await Footer.find({ grandParent: null }).select('name slug customID');
    }

    public async getChildrenOfGrandParent(grandParentId: string): Promise<IFooter[]> {
        return await Footer.find({ grandParent: grandParentId, parent:null }).select('name slug customID');
    }
}
export default new FooterRepo();