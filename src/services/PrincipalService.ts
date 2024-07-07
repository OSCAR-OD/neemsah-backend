import Service from "@services/Service";
import PrincipalRepo from "@repos/PrincipalRepo";
import envVars from "@shared/env-vars";
class PrincipalService extends Service {
    constructor() {
        super(PrincipalRepo);
    }
    public async all() {
        return PrincipalRepo.all();
    }
    public async allPrincipal() {
        return PrincipalRepo.allPrincipal();
    }
    public async allByPosition(position: string) {
        return PrincipalRepo.getAllByPosition(position);
    }
    public async destroy(data: any): Promise<boolean> {
        return PrincipalRepo.destroy(data);
    }
}
export default new PrincipalService();