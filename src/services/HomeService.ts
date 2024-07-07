import Service from "@services/Service";
import HomeRepo from "@repos/HomeRepo";
import SpecialRepo from "@repos/SpecialRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
class HomeService extends Service {
    constructor() {
        super(HomeRepo);
    }

    public async all() {
        return HomeRepo.all();
    }

    public async allIndustryCard() {
        return HomeRepo.allIndustryCard();
    }

    public async allSpecialCard() {
        return SpecialRepo.allSpecialCard();
    }

    public async update(filter: any, data: any): Promise<any> {
        const persist = await HomeRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async updateIndustryCard(filter: any, data: any): Promise<any> {
        const persist = await HomeRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async destroy(data: any): Promise<any> {
        const persist = await HomeRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }

    public async destroyIndustryCard(data: any): Promise<any> {
        const persist = await HomeRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }

    public async destroySpecialCard(data: any): Promise<any> {
        const persist = await SpecialRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }
}

export default new HomeService();