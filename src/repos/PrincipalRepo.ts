import Repo from "@repos/Repo";
import Principal, { IPrincipal } from "@models/Principal";

class PrincipalRepo extends Repo {
    constructor() {
        super(Principal);
    }
    public async all(): Promise<any[]> {
        return (await Principal.find().select('-__v').sort({ createdAt: 'asc' }));
    }
    public async allPrincipal(): Promise<IPrincipal[]> {
        return (await Principal.find().populate('images', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'asc' }));
    }
    public async getAllByPosition(position: string): Promise<IPrincipal[]> {
        return (await Principal.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<IPrincipal> {
        return (await Principal.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
}

export default new PrincipalRepo();