import Service from "@services/Service";
import HeroRepo from "@repos/HeroRepo";


class HeroService extends Service {
    constructor() {
        super(HeroRepo);
    }

    public async allByPosition(position: string) {
        return HeroRepo.getAllByPosition(position);
    }
}
export default new HeroService();