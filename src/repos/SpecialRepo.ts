import Repo from "@repos/Repo";
import SpecialCard from "@models/SpecialCard";

class SpecialRepo extends Repo {
    constructor() {
        super(SpecialCard);
    }
    public async allSpecialCard(): Promise<any[]> {
     
        return (await SpecialCard.find().select('-__v').sort({createdAt: 'asc'}));
    }
}

export default new SpecialRepo();