import Repo from "@repos/Repo";
import Contact, { IContact } from "@models/Contact";

class ContactRepo extends Repo {
    constructor() {
        super(Contact);
    }
}

export default new ContactRepo();