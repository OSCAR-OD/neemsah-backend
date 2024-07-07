import Repo from "@repos/Repo";
import Raw, { IRaw } from "@models/Raw";

class RawmRepo extends Repo {
    constructor() {
        super(Raw);
    }
    public async all(): Promise<any[]> {
        return (await Raw.find().select('-__v').sort({ createdAt: 'asc' }));
    }
    public async allRawmaterial(): Promise<IRaw[]> {
        return (await Raw.find().populate('images', ['path', '_id', 'customID', 'type', 'title', 'description', 'corigin']).select("-__v").sort({ createdAt: 'asc' }));
    }
    public async getAllByPosition(position: string): Promise<IRaw[]> {
        return (await Raw.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<IRaw> {
        return (await Raw.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
}

export default new RawmRepo();