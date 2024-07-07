import Service from "@services/Service";
import PTabRepo from "@repos/PTabRepo";
import envVars from "@shared/env-vars";
class PTabService extends Service {
    constructor() {
        super(PTabRepo);
    }
    public async all() {
        return PTabRepo.all();
    }
    public async allPrincipal() {
        return PTabRepo.all();
    }
    public async allByPosition(position: string) {
        return PTabRepo.getAllByPosition(position);
    }
}
export default new PTabService();