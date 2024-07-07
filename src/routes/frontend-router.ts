import { Router } from "express";
import FrontEndController from "@controller/FrontEndController";
import uploader from "@util/local-uploader";
export const p = {
    basePath: "/frontend",
    allHeroByPosition: "/hero",
    allEmployeeByPosition: "/allEmployeeByPosition",
    allIndustryNav: "/allIndustryNav",
    allIndustryCard: "/home/allIndustryCard",
    allSpecialCard: "/home/allSpecialCard",
    allExhibitionCard: "/home/allExhibitionCard",
    allPrincipals: '/allPrincipals',
    allRawmaterials: '/allRawmaterials',
    allCustomers: '/allCustomers',
    allServiceCard: '/allServiceCard',
    contact: "/contact",
    ticket: "/submitTicket",
    pop_up: "/pop-up/:position",
    setting: "/setting",
    allFooterLink: "/allFooterLink",
    // setting: "/setting/:customID",
    seo: "/seo/:position",
} as const;

// Init
const apiRouter = Router();
apiRouter.use(p.allHeroByPosition, FrontEndController.allHeroByPosition);
apiRouter.use(p.allEmployeeByPosition, FrontEndController.allEmployeeByPosition);
apiRouter.use(p.allIndustryCard, FrontEndController.allIndustryCard);
apiRouter.use(p.allIndustryNav, FrontEndController.allIndustryNav);
apiRouter.use(p.allSpecialCard, FrontEndController.allSpecialCard);
apiRouter.use(p.allExhibitionCard, FrontEndController.allExhibitionCard);
apiRouter.use(p.allPrincipals, FrontEndController.allPrincipals);
apiRouter.use(p.allCustomers, FrontEndController.allCustomers);
apiRouter.use(p.allRawmaterials, FrontEndController.allRawmaterials);
apiRouter.use(p.allServiceCard, FrontEndController.allServiceCard);
apiRouter.use(p.contact, FrontEndController.addContact);
apiRouter.use(p.ticket, FrontEndController.addTicket);
apiRouter.use(p.pop_up, FrontEndController.singlePopUp);
apiRouter.use(p.setting, FrontEndController.getSetting);
apiRouter.use(p.allFooterLink, FrontEndController.allFooterLink);
apiRouter.use(p.seo, FrontEndController.singleSeo);
export default apiRouter;