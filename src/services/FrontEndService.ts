import Service from "@services/Service";
import FrontEndRepo from "@repos/FrontEndRepo";
import PrincipalRepo from "@repos/PrincipalRepo";
import CustomerRepo from "@repos/CustomerRepo";
import RawmRepo from "@repos/RawmRepo";
import ServicePgRepo from "@repos/ServicePgRepo";
import IndustryRepo from "@repos/IndustryRepo";
import FooterRepo from "@repos/FooterRepo";
import SettingRepo from "@repos/SettingRepo";

class FrontEndService extends Service {
    constructor() {
        super(Service);
    }
    public async allByPosition(position: string) {
        return FrontEndRepo.getAllByPosition(position);
    }
    public async allEmployeeByPosition(position: string) {
        return FrontEndRepo.getAllEmployeeByPosition(position);
    }
    public async allIndustryCard() {
        return FrontEndRepo.allIndustryCard();
    }
    public async allIndustryNav() {
        return IndustryRepo.allIndustryNav();
    }
    public async allFooterLink() {
        return FooterRepo.allFooterNav();
    }
    public async allSpecialCard() {
        return FrontEndRepo.allSpecialCard();
    }
    public async allExhibitionCard() {
        return FrontEndRepo.allExhibitionCard();
    }
    public async allServiceCard() {
        return ServicePgRepo.allServiceCard();
    }
    public async allPrincipal() {
        return PrincipalRepo.allPrincipal();
    }
    public async allCustomer() {
        return CustomerRepo.allCustomer();
    }
    public async allRawmaterial() {
        return RawmRepo.allRawmaterial();
    }
    public async allGallery() {
        return FrontEndRepo.getAllGallery();
    }
    public async getSetting() {
        return SettingRepo.all();
    }
    public async singlePopUpByField(data: any) {
        return FrontEndRepo.singlePopUpByField(data);
    }
    public async singleSeoByField(data: any) {
        return FrontEndRepo.singleSeoByField(data);
    }
}
export default new FrontEndService();