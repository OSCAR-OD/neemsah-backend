import Repo from "@repos/Repo";
import Employee, {IEmployee} from "@models/Employee";

class EmployeeRepo extends Repo {
    constructor() {
        super(Employee);
    }
    public async getAllByPosition(position: string): Promise<IEmployee[]> {
        return (await Employee.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'asc' }));
    }
}

export default new EmployeeRepo();