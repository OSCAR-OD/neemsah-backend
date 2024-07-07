import Service from "@services/Service";
import CTabRepo from "@repos/CTabRepo";
import envVars from "@shared/env-vars";
class CTabService extends Service {
    constructor() {
        super(CTabRepo);
    }
    public async all() {
        return CTabRepo.all();
    }
    public async allCustomer() {
        return CTabRepo.all();
    }
    public async allByPosition(position: string) {
        return CTabRepo.getAllByPosition(position);
    }
}
export default new CTabService();