import { Router } from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import SalesController from "@controller/admin/SalesController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/sales',
    createDailyReport: '/createDailyReport',
    allRfqList: '/allRfqList',
    viewSingleRFQ: '/viewSingleRFQ/:customID',
    editSingleRFQ: '/editSingleRFQ/:customID',
    allProjectsByField: '/allProjectsByField/:assignedEmployee',
    singleProjectByField: '/singleProjectByField/:pid',
    allContactforSales: '/allContactforSales/:cid', 
    lastVisitSummaryByField: '/lastVisitSummaryByField/:pid',
} as const;

// **** Routes **** //
router.post(
    p.createDailyReport,
    SalesController.createDailyReport
);
router.get(
    p.allRfqList,
    SalesController.allRfqList
);
router.get(
    p.viewSingleRFQ,
    SalesController.viewSingleRFQ
);
router.post(
    p.editSingleRFQ,
    uploader.array("files"),
    SalesController.editSingleRFQ
);
router.get(
    p.allProjectsByField,
    SalesController.allProjectsByField
);
router.get(
    p.singleProjectByField,
    SalesController.singleProjectByField
);
router.get(
    p.allContactforSales,
    SalesController.allContactforSales
);
router.get(
    p.lastVisitSummaryByField,
    SalesController.lastVisitSummaryByField
);
// **** Export default **** //
export default router;