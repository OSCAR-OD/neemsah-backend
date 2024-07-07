import Repo from "@repos/Repo";
import ServiceCard, {IServiceCard} from "@models/ServiceCard";

class ServicePgRepo extends Repo {
    constructor() {
        super(ServiceCard);
    }
    public async allServiceCard(): Promise<IServiceCard[]> {
        return (await ServiceCard.find().populate('images', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'asc' }));
}
}
export default new ServicePgRepo();