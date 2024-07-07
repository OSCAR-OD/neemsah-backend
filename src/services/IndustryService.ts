import Service from "@services/Service";
import IndustryRepo from "@repos/IndustryRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
import { AnyArn } from "aws-sdk/clients/groundstation";
import {IIndustryPage} from "@models/IndustryPage";
import {IRefferenceImage} from "@models/RefferenceImage";
import { Document } from "mongoose";
class IndustryService extends Service {
    constructor() {
        super(IndustryRepo);
    }
    public async all() {
        return IndustryRepo.all();
    }
    public async allIndustryNav() {
        return IndustryRepo.allIndustryNav();
    }
    public async addIndustryNav(data: any) {
        try {
            const industryNav = await IndustryRepo.create(data);
            return industryNav;
        } catch (error) {
            throw new Error('Error adding industry navigation');
        }
    }
    public async addIndustryPage(data: IIndustryPage) {
        try {
            return (await IndustryRepo.createIndustryPage(data));
        } catch (error) {
            throw new Error('Error adding industry Page');
        }
    }
    public async singleByIndustryID(filter: { industryID: string }): Promise<IIndustryPage> {
        try {
            const industryPage = await IndustryRepo.singleByIndustryID(filter.industryID);
            return industryPage;
        } catch (error) {
            throw new Error('Error fetching single industry page');
        }
    }
    public async deleteIndustryNav(data: any): Promise<boolean> {
        return IndustryRepo.destroy(data);
    }
    public async updateIndustryNav(filter: any, data: any):Promise<any>{ 
        try {
            const industryNav = await IndustryRepo.update(filter, data);
            return industryNav;
        } catch (error) {
            throw new Error('Error adding industry navigation');
        }
        }
    public async update(filter: any, data: any): Promise<any> {
        const persist = await IndustryRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }
    public async updateIndustryCard(filter: any, data: any): Promise<any> {
        const persist = await IndustryRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }
    public async getChildrenOfGrandParent(data: any) {
        return IndustryRepo.getChildrenOfGrandParent(data);
    }
    public async getGrandParent() {
        return IndustryRepo.getGrandParent();
    }
    public async bulkInsertRefferenceImage(data: IRefferenceImage[]): Promise<any> {
        return IndustryRepo.bulkInsertRefferenceImage(data);
    }
    public async allRefferenceImage() {
        return IndustryRepo.allRefferenceImage();
    }
    
}

export default new IndustryService();