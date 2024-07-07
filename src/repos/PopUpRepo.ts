import Repo from "@repos/Repo";
import PopUp, { IPopUp } from "@models/PopUp";

class PopUpRepo extends Repo {
    constructor() {
        super(PopUp);
    }
    public async all(): Promise<any[]> {

        return (await PopUp.find().select('-__v').sort({ createdAt: 'desc' }));
    }
    public async getAllByPosition(position: string): Promise<IPopUp[]> {
        return (await PopUp.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<IPopUp> {
        return (await PopUp.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }

}

export default new PopUpRepo();