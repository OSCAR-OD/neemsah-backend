import { Router } from 'express';
import uploader from "@util/local-uploader";
import IndustryController from "@controller/admin/IndustryController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/industry',
    addIndustryNav: '/addIndustryNav',
    addIndustryPage: '/addIndustryPage',
    all: '/all',
    allIndustryNav: '/allIndustryNav',
    single: '/single/:customID',
    singleIndustryNav: '/singleIndustryNav/:customID',
    singleIndustryPage: '/singleIndustryPage/:industryID',
    edit: '/edit/:customID',
    editIndustryNav: '/editIndustryNav/:customID',
    delete: '/delete/:customID',
    deleteIndustryNav: '/deleteIndustryNav/:customID',
    getChildrenOfGrandParent: '/childrenOfGrandParent/:grandParentId',
    getGrandParent: '/getGrandParent',
    uploadRefferenceImage: '/uploadRefferenceImage',
    allRefferenceImage: '/allRefferenceImage',
} as const;

// **** Routes **** //
router.post(
    p.addIndustryNav,
    IndustryController.addIndustryNav
);
router.post(
    p.uploadRefferenceImage,
    uploader.array("files"),
    IndustryController.uploadRefferenceImage
);
router.get(
    p.allRefferenceImage,
    IndustryController.allRefferenceImage
);
router.post(
    p.addIndustryPage,
    uploader.array("files"),
    IndustryController.addIndustryPage
);
router.get(
    p.all,
    IndustryController.all
);
router.get(
    p.allIndustryNav,
    IndustryController.allIndustryNav
);
router.get(
    p.single,
    IndustryController.single
);
router.get(
    p.singleIndustryNav,
    IndustryController.singleIndustryNav
);
router.get(
    p.singleIndustryPage,
    IndustryController.singleIndustryPage
);
router.post(
    p.editIndustryNav,
    IndustryController.editIndustryNav
);
router.delete(
    p.delete,
    IndustryController.delete
);
router.delete(
    p.deleteIndustryNav,
    IndustryController.deleteIndustryNav
);
router.get(
    p.getChildrenOfGrandParent,
    IndustryController.getChildrenOfGrandParent
);
router.get(
    p.getGrandParent,
    IndustryController.getGrandParent
);

// **** Export default **** //
export default router;
