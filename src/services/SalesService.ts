import Service from "@services/Service";
import SalesRepo from "@repos/SalesRepo";
class SalesService extends Service {
    constructor() {
        super(SalesRepo);
    }
    public async createDailyReport(data: any) {
    try {
        const dailyReport = await SalesRepo.createDailyReport(data);
        return dailyReport;
    } catch (error) {
        throw new Error('Error adding industry navigation');
    }
}
public async updateDailyReport(filter: any, data: any): Promise<any> {
    try {
        const dailyReport = await SalesRepo.updateDailyReport(filter, data);
        return dailyReport;
    } catch (error) {
        console.error("Error in updating Daily Report:", error);
        throw new Error('Error updating Daily Report');
    }
}
public async allRfqList() {
    return SalesRepo.allRfqList();
}
public async singleByFieldRfqID(data: any) {
    try {
        const rfqType = await SalesRepo.singleByFieldRfqID(data);
        return rfqType;
    } catch (error) {
        throw new Error('Error retrieving RFQ by field');
    }
}
public async allProjectsByField(data: any) {
    try {
        const allProjects = await SalesRepo.allProjectsByField(data);
        return allProjects;
    } catch (error) {
        throw new Error('Error retrieving projects');
    }
}
public async singleProjectByField(data: any) {
    try {
        const singleProject = await SalesRepo.singleProjectByField(data);
        return singleProject;
    } catch (error) {
        throw new Error('Error retrieving project');
    }
}
public async lastVisitSummaryByField(data: any) {
    try {
        const alllastVisitSummary = await SalesRepo.lastVisitSummaryByField(data);
        return alllastVisitSummary;
    } catch (error) {
        throw new Error('Error retrieving Last Visit Summary');
    }
}
}

export default new SalesService();