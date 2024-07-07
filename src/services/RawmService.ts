import Service from "@services/Service";
import RawmRepo from "@repos/RawmRepo";
import envVars from "@shared/env-vars";
class RawmService extends Service {
    constructor() {
        super(RawmRepo);
    }
    public async all() {
        return RawmRepo.all();
    }
    public async allRawm() {
        return RawmRepo.all();
    }
    public async allRawmaterial() {
        return RawmRepo.allRawmaterial();
    }
    public async allByPosition(position: string) {
        return RawmRepo.getAllByPosition(position);
    }
    public async destroy(data: any): Promise<boolean> {
        return RawmRepo.destroy(data);
    }
}
export default new RawmService();