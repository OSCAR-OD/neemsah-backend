import Service from "@services/Service";
import NavbarRepo from "@repos/NavbarRepo";


class NavbarService extends Service {
    constructor() {
        super(NavbarRepo);
    }
}

export default new NavbarService();