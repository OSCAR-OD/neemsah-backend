import Repo from "@repos/Repo";
import CrmCustomer, { ICrmCustomer } from "@models/CrmCustomer";
import CrmProject, { ICrmProject } from "@models/CrmProject";
import CrmContact, { ICrmContact } from "@models/CrmContact";
import CrmRfqType, { ICrmRfqType } from "@models/CrmRfqType";
import CrmRSVP, { ICrmRSVP } from "@models/CrmRSVP";
class CrmRepo extends Repo {
    constructor() {
        super(CrmCustomer);
    }
    public async allRfqType(): Promise<ICrmRfqType[]>{
        return (await CrmRfqType.find().sort({ createdAt: 'desc' }));
    }
    public async createRfqType(data: ICrmRfqType): Promise<ICrmRfqType> {
        const rfqType = new CrmRfqType(data);
        await rfqType.save();
        return rfqType;
    }
    public async deleteRfqType(customID: any): Promise<boolean> {
        let outcome: boolean = false;
        const result = await CrmRfqType.deleteOne( {customID: customID} )? outcome = true : null;
        return outcome;
    }
    public async singleByFieldRfqType(data: any): Promise<ICrmRfqType> {
        const singleRfqType = new Repo(CrmRfqType);
        return await singleRfqType.singleByField(data);
    }
    public async allByFieldRfqType(data: any): Promise<ICrmRfqType> {
       const allRfqType = new Repo(CrmRfqType);
       return await allRfqType.allByField(data);
    }
    public async singleByFieldRfqTypeID(data: any): Promise<ICrmRSVP> {
        const singleRfqTypeID = new Repo(CrmRSVP);
        return await singleRfqTypeID.singleByField(data);
    }
    public async createRSVP(data: ICrmRSVP): Promise<ICrmRSVP> {
        const rsvp = new CrmRSVP(data);
        await rsvp.save();
        return rsvp;
    }
    public async updateRSVP(filter: any, data: any): Promise<any> {
        try {
            let outcome: boolean = false;
            const updatedRSVP = new Repo(CrmRSVP);
            return await updatedRSVP.update(filter, data);    
        } catch (error) {
            throw new Error('Error updating RSVP');
        }
    }
    public async singleByFieldContact(data: any): Promise<ICrmContact> {
        const singleCrmContact = new Repo(CrmContact);
        return await singleCrmContact.singleByField(data);
    }
    public async allByFieldContact(data: any): Promise<ICrmContact> {
        const allCrmContact = new Repo(CrmContact);
        return await allCrmContact.allByField(data);
    }
    public async allProject(): Promise<ICrmProject[]> {
        return (await CrmProject.find().select("-__v").sort({ createdAt: 'desc' }));
    }
    public async createProject(data: ICrmProject): Promise<ICrmProject> {
        const crmProject = new CrmProject(data);
        await crmProject.save();
        return crmProject;
    }
    public async deleteProject(customID: any): Promise<boolean> {
        let outcome: boolean = false;
        const result = await CrmProject.deleteOne( {customID: customID} )? outcome = true : null;
        return outcome;
    }
    public async allContact(): Promise<ICrmContact[]> {
        return (await CrmContact.find().select("-__v").sort({ createdAt: 'desc' }));
    }
    public async createContact(data: ICrmContact): Promise<ICrmContact> {
        const crmContact = new CrmContact(data);
        await crmContact.save();
        return crmContact;
    }
    public async deleteContact(customID: any): Promise<boolean> {
        let outcome: boolean = false;
        const result = await CrmContact.deleteOne( {customID: customID} )? outcome = true : null;
        return outcome;
    }
    public async allCustomer(): Promise<ICrmCustomer[]> {
        return (await CrmCustomer.find().populate('images', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'asc' }));
    }
    public async createCustomer(data: ICrmCustomer): Promise<ICrmCustomer> {
        const crmCustomer = new CrmCustomer(data);
        await crmCustomer.save();
        return crmCustomer;
    }
}
export default new CrmRepo();