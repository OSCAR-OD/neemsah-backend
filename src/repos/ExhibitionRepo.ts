import Repo from "@repos/Repo";
import ExhibitionCard from "@models/ExhibitionCard";

class ExhibitionRepo extends Repo {
    constructor() {
        super(ExhibitionCard);
    }
    public async allExhibitionCard(): Promise<any[]> {
     
        return (await ExhibitionCard.find().select('-__v').sort({createdAt: 'desc'}));
    }
}

export default new ExhibitionRepo();