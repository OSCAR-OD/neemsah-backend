import Repo from "@repos/Repo";
import PTab, { IPTab } from "@models/PTab";

class PTabRepo extends Repo {
    constructor() {
        super(PTab);
    }
    public async all(): Promise<any[]> {
        return (await PTab.find().select('-__v').sort({ createdAt: 'asc' }));
    }
    public async getAllByPosition(position: string): Promise<IPTab[]> {
        return (await PTab.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<IPTab> {
        return (await PTab.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
}

export default new PTabRepo();