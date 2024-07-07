import Repo from "@repos/Repo";
import VisitReport, { IVisitReport } from "@models/VisitReport";
import CrmProject, { ICrmProject } from "@models/CrmProject";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
class SalesRepo extends Repo {
    constructor() {
        super(VisitReport);
    }
    public async createDailyReport(data: IVisitReport): Promise<IVisitReport> {
        const visitReport = new VisitReport(data);
        await visitReport.save();
        return visitReport;
    }
    public async updateDailyReport(filter: any, data: any): Promise<any> {
        try {
            let outcome: boolean = false;
            const updatedRSVPVisitReport = new Repo(VisitReport);
            const persist = await updatedRSVPVisitReport.singleByField(filter);
            //console.log("Persisted Document:", persist);
            if (persist.path && data.path !== persist.path) {
                const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
                return await updatedRSVPVisitReport.update(filter, data);    
            
        } catch (error) {
            console.error("Error in updating Visit Report:", error);
            throw new Error('Error updating Visit Report');
        }
    }
    public async allRfqList(): Promise<any[]> {
        return (await VisitReport.find().select('-__v').sort({ createdAt: 'desc' }));
    }
    public async singleByFieldRfqID(data: any): Promise<IVisitReport> {
        const singleRfq = new Repo(VisitReport);
        return await singleRfq.singleByField(data);
    }
    public async allProjectsByField(data: any): Promise<ICrmProject> {
        const allCrmProject = new Repo(CrmProject);
        return await allCrmProject.allByField(data);
    }
    public async singleProjectByField(data: any): Promise<ICrmProject> {
        const singleProject = new Repo(CrmProject);
        return await singleProject.singleByField(data);
    }
    public async lastVisitSummaryByField(data: any): Promise<IVisitReport> {
        const allLastVisitSummary = new Repo(VisitReport);
        return await allLastVisitSummary.allByField(data);
    }
}
export default new SalesRepo();