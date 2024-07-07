import Service from "@services/Service";
import RTabRepo from "@repos/RTabRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
class RTabService extends Service {
    constructor() {
        super(RTabRepo);
    }
    public async all() {
        return RTabRepo.all();
    }
    public async allByPosition(position: string) {
        return RTabRepo.getAllByPosition(position);
    }
}
export default new RTabService();