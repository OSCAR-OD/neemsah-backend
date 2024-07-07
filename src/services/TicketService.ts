import Service from "@services/Service";
import TicketRepo from "@repos/TicketRepo";


class TicketService extends Service {
    constructor() {
        super(TicketRepo);
    }
}

export default new TicketService();