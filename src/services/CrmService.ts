import Service from "@services/Service";
import CrmRepo from "@repos/CrmRepo";
import path from "path";
import fs from "fs";
import CrmRSVP from "@models/CrmRSVP";
class CrmService extends Service {
    constructor() {
        super(CrmRepo);
    }
    public async all() {
        return CrmRepo.all();
    }
    public async allCustomer() {
        return CrmRepo.allCustomer();
    }
    public async addCustomer(data: any) {
        try {
            const customer = await CrmRepo.createCustomer(data);
            return customer;
        } catch (error) {
            throw new Error('Error adding industry navigation');
        }
    }
    public async allRfqType() {
        return CrmRepo.allRfqType();
    }
    public async addRfqType(data: any) {
        try {
            const rfqType = await CrmRepo.createRfqType(data);
            return rfqType;
        } catch (error) {
            throw new Error('Error adding RFQ Type');
        }
    }
    public async destroyRfqType(customID: string): Promise<boolean> {
        try {
            const result = await CrmRepo.deleteRfqType(customID);
            return result;
        } catch (error) {
            throw new Error('Error deleting RFQ type');
        }
    }
    public async singleByFieldRfqType(data: any) {
        try {
            const rfqType = await CrmRepo.singleByFieldRfqType(data);
            return rfqType;
        } catch (error) {
            throw new Error('Error retrieving RFQ type by field');
        }
    }
    public async allByFieldRfqType(data: any) {
        try {
            const allByFieldRfqType = await CrmRepo.allByFieldRfqType(data);
            return allByFieldRfqType;
        } catch (error) {
            throw new Error('Error retrieving Rfq Types');
        }
    }
    public async singleByFieldRfqTypeID(data: any) {
        try {
            const rfqTypeID = await CrmRepo.singleByFieldRfqTypeID(data);
            return rfqTypeID;
        } catch (error) {
            throw new Error('Error retrieving RFQ type ID by field');
        }
    }
    public async createRSVP(data: any): Promise<any> {
        try {
            return await CrmRepo.createRSVP(data);
        } catch (error) {
            console.error("Error in createRSVP:", error);
            throw new Error('Error creating RSVP');
        }
    }
    public async updateRSVP(filter: any, data: any): Promise<any> {
        try {
            return await CrmRepo.updateRSVP(filter, data);
        } catch (error) {
            console.error("Error in updateRSVP:", error);
            throw new Error('Error updating RSVP');
        }
    }
    public async singleByFieldContact(data: any) {
        try {
            const singleContact = await CrmRepo.singleByFieldContact(data);
            return singleContact;
        } catch (error) {
            throw new Error('Error retrieving Contacts');
        }
    }
    public async allByFieldContactforSales(data: any) {
        try {
            const singleContact = await CrmRepo.allByFieldContact(data);
            return singleContact;
        } catch (error) {
            throw new Error('Error retrieving Contacts');
        }
    }
    public async allProject() {
        return CrmRepo.allProject();
    }
    public async addProject(data: any) {
        try {
            const customer = await CrmRepo.createProject(data);
            return customer;
        } catch (error) {
            throw new Error('Error adding Project');
        }
    }
    public async deleteProject(customID: string): Promise<boolean> {
        try {
            const result = await CrmRepo.deleteProject(customID);
            return result;
        } catch (error) {
            throw new Error('Error deleting RFQ type');
        }
    }
    public async allContact() {
        return CrmRepo.allContact();
    }
    public async addContact(data: any) {
        try {
            const contact = await CrmRepo.createContact(data);
            return contact;
        } catch (error) {
            throw new Error('Error adding contact');
        }
    }
    public async deleteContact(customID: string): Promise<boolean> {
        try {
            const result = await CrmRepo.deleteContact(customID);
            return result;
        } catch (error) {
            throw new Error('Error deleting RFQ type');
        }
    }

}

export default new CrmService();