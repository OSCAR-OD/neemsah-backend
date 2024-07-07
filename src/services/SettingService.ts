import Service from "@services/Service";
import SettingRepo from "@repos/SettingRepo";


class SettingService extends Service {
    constructor() {
        super(SettingRepo);
    }
}

export default new SettingService();