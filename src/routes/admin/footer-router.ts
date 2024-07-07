import { Router } from 'express';
import uploader from "@util/local-uploader";
import FooterController from "@controller/admin/FooterController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/footer',
    addFooterNav: '/addFooterNav',
    all: '/all',
    allFooterNav: '/allFooterNav',
    single: '/single/:customID',
    singleFooterNav: '/singleFooterNav/:customID',
    edit: '/edit/:customID',
    editFooterNav: '/editFooterNav/:customID',
    delete: '/delete/:customID',
    deleteFooterNav: '/deleteFooterNav/:customID',
    getChildrenOfGrandParent: '/childrenOfGrandParent/:grandParentId',
    getGrandParent: '/getGrandParent',
} as const;

// **** Routes **** //
router.post(
    p.addFooterNav,
    FooterController.addFooterNav
);
router.get(
    p.allFooterNav,
    FooterController.allFooterNav
);
router.post(
    p.editFooterNav,
    FooterController.editFooterNav
);
router.get(
    p.singleFooterNav,
    FooterController.singleFooterNav
);
router.delete(
    p.delete,
    FooterController.delete
);
router.delete(
    p.deleteFooterNav,
    FooterController.deleteFooterNav
);
router.get(
    p.getChildrenOfGrandParent,
    FooterController.getChildrenOfGrandParent
);
router.get(
    p.getGrandParent,
    FooterController.getGrandParent
);

// **** Export default **** //
export default router;
