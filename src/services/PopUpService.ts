import Service from "@services/Service";
import PopUpRepo from "@repos/PopUpRepo";


class PopUpService extends Service {
    constructor() {
        super(PopUpRepo);
    }

    public async allByPosition(position: string) {
        return PopUpRepo.getAllByPosition(position);
    }
}
export default new PopUpService();