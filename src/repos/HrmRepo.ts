import Repo from "@repos/Repo";
import HrmEmployee, { IHrmEmployee } from "@models/HrmEmployee";
class HrmRepo extends Repo {
  constructor() {
    super(HrmEmployee);
  }
  public async createEmployee(data: IHrmEmployee): Promise<IHrmEmployee> {
    const hrmEmployee = new HrmEmployee(data);
    await hrmEmployee.save();
    return hrmEmployee;
  }
  /**
  * See if a user with the given email exists.
  */
  public async existByEmail(email: string): Promise<boolean> {
    const user: IHrmEmployee | null = await HrmEmployee.findOne({ email });
    return user !== null;
  }
  /**
  * Find a user with the given email exists.
  */
  public async getByEmail(email: string): Promise<IHrmEmployee | null> {
    return await HrmEmployee.findOne({ email });
  }
public async allHrmEmployee(): Promise<IHrmEmployee[]> {
  return (await HrmEmployee.find().populate('image', ['path', '_id', 'customID']).select("-__v").sort({ createdAt: 'asc' }));
}
}
export default new HrmRepo();