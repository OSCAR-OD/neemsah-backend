import Service from "@services/Service";
import ServicePgRepo from "@repos/ServicePgRepo";
import SpecialRepo from "@repos/SpecialRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
class ServicePgService extends Service {
    constructor() {
        super(ServicePgRepo);
    }

    public async all() {
        return ServicePgRepo.all();
    }

    public async allServiceCard() {
        return ServicePgRepo.allServiceCard();
    }
    public async update(filter: any, data: any): Promise<any> {
        const persist = await ServicePgRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async updateIndustryCard(filter: any, data: any): Promise<any> {
        const persist = await ServicePgRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async destroy(data: any): Promise<any> {
        const persist = await ServicePgRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }

    public async destroyIndustryCard(data: any): Promise<any> {
        const persist = await ServicePgRepo.singleByField(data);
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

export default new ServicePgService();