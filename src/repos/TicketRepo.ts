import Repo from "@repos/Repo";
import Ticket, { ITicket } from "@models/Ticket";

class TicketRepo extends Repo {
    constructor() {
        super(Ticket);
    }
}

export default new TicketRepo();