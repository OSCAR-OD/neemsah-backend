import Repo from "@repos/Repo";
import IndustryCard from "@models/IndustryCard";
class HomeRepo extends Repo {
    constructor() {
        super(IndustryCard);
    }
    public async allIndustryCard(): Promise<any[]> {
        return (await IndustryCard.find().select('-__v').sort({createdAt: 'asc'}));
    }
}

export default new HomeRepo();