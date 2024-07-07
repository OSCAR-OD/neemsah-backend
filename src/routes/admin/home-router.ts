import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import HomeController from "@controller/admin/HomeController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/home',
    uploadIndustryCard: '/industry-card-upload',
    uploadSpecialCard: '/special-card-upload',
    uploadExhibitionCard: '/exhibition-card-upload',
    all: '/all',
    allIndustryCard: '/allIndustryCard',
    allSpecialCard: '/allSpecialCard',
    allExhibitionCard: '/allExhibitionCard',
    single: '/single/:customID',
    singleIndustryCard: '/industryCard/single/:customID',
    singleSpecialCard: '/specialCard/single/:customID',
    singleExhibitionCard: '/exhibitionCard/single/:customID',
    edit: '/edit/:customID',
    editIndustryCard: '/editIndustryCard/:customID',
    editSpecialCard: '/editSpecialCard/:customID',
    editExhibitionCard: '/editExhibitionCard/:customID',
    delete: '/delete/:customID',
    deleteIndustryCard: '/deleteIndustryCard/:customID',
    deleteSpecialCard: '/deleteSpecialCard/:customID',
    deleteExhibitionCard: '/deleteExhibitionCard/:customID',
} as const;

// **** Routes **** //

router.post(
    p.uploadIndustryCard,
    uploader.array("files"),
    HomeController.uploadIndustryCard,
);
router.post(
    p.uploadSpecialCard,
    uploader.array("files"),
    HomeController.uploadSpecialCard,
);
router.post(
    p.uploadExhibitionCard,
    uploader.array("files"),
    HomeController.uploadExhibitionCard,
);
router.get(
    p.all,
    HomeController.all
);
router.get(
    p.allIndustryCard,
    HomeController.allIndustryCard
);
router.get(
    p.allSpecialCard,
    HomeController.allSpecialCard
);
router.get(
    p.allExhibitionCard,
    HomeController.allExhibitionCard
);
router.get(
    p.single,
    HomeController.single
);
router.get(
    p.singleIndustryCard,
    HomeController.singleIndustryCard
);
router.get(
    p.singleSpecialCard,
    HomeController.singleSpecialCard
);
router.get(
    p.singleExhibitionCard,
    HomeController.singleExhibitionCard
);
router.post(
    p.edit,
    uploader.array("files"),
    HomeController.edit
);
router.post(
    p.editIndustryCard,
    uploader.array("files"),
    HomeController.editIndustryCard
);
router.post(
    p.editSpecialCard,
    uploader.array("files"),
    HomeController.editSpecialCard
);
router.post(
    p.editExhibitionCard,
    uploader.array("files"),
    HomeController.editExhibitionCard
);
router.delete(
    p.delete,
    HomeController.delete
);
router.delete(
    p.deleteIndustryCard,
    HomeController.deleteIndustryCard
);
router.delete(
    p.deleteSpecialCard,
    HomeController.deleteSpecialCard
);
router.delete(
    p.deleteExhibitionCard,
    HomeController.deleteExhibitionCard
);

// **** Export default **** //
export default router;