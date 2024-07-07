import Repo from "@repos/Repo";
import Seo, { ISeo } from "@models/Seo";

class SeoRepo extends Repo {
    constructor() {
        super(Seo);
    }
    public async all(): Promise<any[]> {

        return (await Seo.find().select('-__v').sort({ createdAt: 'desc' }));
    }
    public async getAllByPosition(position: string): Promise<ISeo[]> {
        return (await Seo.find({ position: position }).sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<ISeo> {
        return (await Seo.findOne(data).select("-__v").select('-__v -_id'));
    }

}

export default new SeoRepo();