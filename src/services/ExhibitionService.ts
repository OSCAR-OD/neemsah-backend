import Service from "@services/Service";
import ExhibitionRepo from "@repos/ExhibitionRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
class ExhibitionService extends Service {
    constructor() {
        super(ExhibitionRepo);
    }

    public async all() {
        return ExhibitionRepo.all();
    }

    public async allExhibitionCard() {
        return ExhibitionRepo.allExhibitionCard();
    }

    public async update(filter: any, data: any): Promise<any> {
        const persist = await ExhibitionRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async destroy(data: any): Promise<any> {
        const persist = await ExhibitionRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }

    public async destroyExhibitionCard(data: any): Promise<any> {
        const persist = await ExhibitionRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }
}

export default new ExhibitionService();