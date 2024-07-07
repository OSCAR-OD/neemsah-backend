import Service from "@services/Service";
import TestQRRepo from "@repos/TestQRRepo";


class TestQRService extends Service {
    constructor() {
        super(TestQRRepo);
    }
    public async allByType(type: string) {
        return TestQRRepo.getAllByType(type);
    }
}
export default new TestQRService();