import Service from "@services/Service";
import FooterRepo from "@repos/FooterRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
import { AnyArn } from "aws-sdk/clients/groundstation";
class FooterService extends Service {
    constructor() {
        super(FooterRepo);
    }
    public async all() {
        return FooterRepo.all();
    }
    public async allFooterNav() {
        return FooterRepo.allFooterNav();
    }
    public async addFooterNav(data: any) {
        try {
            const industryNav = await FooterRepo.create(data);
            return industryNav;
        } catch (error) {
            throw new Error('Error adding industry navigation');
        }
    }
    public async deleteFooterNav(data: any): Promise<boolean> {
        return FooterRepo.destroy(data);
    }
    public async updateFooterNav(filter: any, data: any):Promise<any>{ 
        try {
            const industryNav = await FooterRepo.update(filter, data);
            return industryNav;
        } catch (error) {
            throw new Error('Error adding industry navigation');
        }
        }
    public async update(filter: any, data: any): Promise<any> {
        const persist = await FooterRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }
    public async updateFooterCard(filter: any, data: any): Promise<any> {
        const persist = await FooterRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async getChildrenOfGrandParent(data: any) {
        return FooterRepo.getChildrenOfGrandParent(data);
    }
    public async getGrandParent() {
        return FooterRepo.getGrandParent();
    }
}

export default new FooterService();