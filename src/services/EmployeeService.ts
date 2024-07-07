import EmployeeRepo from "@repos/EmployeeRepo";
import Service from "@services/Service";

class EmployeeService extends Service {
    constructor() {
        super(EmployeeRepo);
    }

    public async allByPosition(position: string) {
        return EmployeeRepo.getAllByPosition(position);
    }
}
export default new EmployeeService();