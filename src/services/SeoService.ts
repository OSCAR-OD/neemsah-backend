import Service from "@services/Service";
import SeoRepo from "@repos/SeoRepo";


class SeoService extends Service {
    constructor() {
        super(SeoRepo);
    }

    public async allByPosition(position: string) {
        return SeoRepo.getAllByPosition(position);
    }
}
export default new SeoService();