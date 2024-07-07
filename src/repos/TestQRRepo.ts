import Repo from "@repos/Repo";
import TestQR, { ITestQR } from "@models/TestQR";

class TestQRRepo extends Repo {
    constructor() {
        super(TestQR);
    }
    public async getAllByType(type: string): Promise<ITestQR[]> {
        return (await TestQR.find({ type: type }).sort({ createdAt: 'desc' }));
    }

}

export default new TestQRRepo();