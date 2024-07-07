import Service from "@services/Service";
import ContactRepo from "@repos/ContactRepo";


class ContactService extends Service {
    constructor() {
        super(ContactRepo);
    }
}

export default new ContactService();