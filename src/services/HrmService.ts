import Service from "@services/Service";
import HrmRepo from "@repos/HrmRepo";
import path from "path";
import fs from "fs";
class HrmService extends Service {
    constructor() {
        super(HrmRepo);
    }
    public async all() {
        return HrmRepo.all();
    }
    public async allHrmEmployee() {
        return HrmRepo.allHrmEmployee();
    }
}

export default new HrmService();