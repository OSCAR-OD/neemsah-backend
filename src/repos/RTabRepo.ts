import Repo from "@repos/Repo";
import RTab, { IRTab } from "@models/RTab";

class RTabRepo extends Repo {
    constructor() {
        super(RTab);
    }
    public async all(): Promise<any[]> {
        return (await RTab.find().select('-__v').sort({createdAt: 'desc'}));
    }
    public async getAllByPosition(position: string): Promise<IRTab[]> {
        return (await RTab.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
}

export default new RTabRepo();