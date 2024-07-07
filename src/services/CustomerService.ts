import Service from "@services/Service";
import CustomerRepo from "@repos/CustomerRepo";
import envVars from "@shared/env-vars";
class CustomerService extends Service {
    constructor() {
        super(CustomerRepo);
    }
    public async all() {
        return CustomerRepo.all();
    }
    public async allCustomer() {
        return CustomerRepo.allCustomer();
    }
    public async allByPosition(position: string) {
        return CustomerRepo.getAllByPosition(position);
    }
    public async destroy(data: any): Promise<boolean> {
        return CustomerRepo.destroy(data);
    }
}
export default new CustomerService();