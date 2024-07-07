import Repo from "@repos/Repo";
// import Customer, { ICustomer } from "@models/Customer";
import Customer, { ICustomer } from "@models/Customer";

class CustomerRepo extends Repo {
    constructor() {
        super(Customer);
    }
    public async all(): Promise<any[]> {
        return (await Customer.find().select('-__v').sort({ createdAt: 'asc' }));
    }
    public async allCustomer(): Promise<ICustomer[]> {
        return (await Customer.find().populate('images', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'asc' }));
    }
    public async getAllByPosition(position: string): Promise<ICustomer[]> {
        return (await Customer.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<ICustomer> {
        return (await Customer.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
}

export default new CustomerRepo();