import Repo from "@repos/Repo";
import Navbar, { INavbar } from "@models/Navbar";

class NavbarRepo extends Repo {
    constructor() {
        super(Navbar);
    }
}

export default new NavbarRepo();