import Repo from "@repos/Repo";
// import Principal, { IPrincipal } from "@models/Principal";
import CTab, { ICTab } from "@models/CTab";

class CTabRepo extends Repo {
    constructor() {
        super(CTab);
    }
    public async all(): Promise<any[]> {
        return (await CTab.find().select('-__v').sort({ createdAt: 'asc' }));
    }
    public async getAllByPosition(position: string): Promise<ICTab[]> {
        return (await CTab.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<ICTab> {
        return (await CTab.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
}

export default new CTabRepo();