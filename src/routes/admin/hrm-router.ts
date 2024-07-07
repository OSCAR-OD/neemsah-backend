import { Router } from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import HrmController from "@controller/admin/HrmController";
// **** Variables **** //
// Misc
const router = Router();
// Paths
export const p = {
    basePath: '/hrm',
    registerEmployee: '/registerEmployee',
    allHrmEmployee: '/allHrmEmployee',
    deleteHrmEmployee: '/deleteHrmEmployee/:customID',
    singleHrmEmployee: '/singleHrmEmployee/:customID',
    editHrmEmployee: '/editHrmEmployee/:customID',
} as const;
// **** Routes **** //
router.post(
    p.registerEmployee,
    HrmController.registerEmployee
);
router.get(
    p.allHrmEmployee,
    HrmController.allHrmEmployee
);
router.delete(
    p.deleteHrmEmployee,
    HrmController.deleteHrmEmployee
);
router.get(
    p.singleHrmEmployee,
    HrmController.singleHrmEmployee
);
router.post(
    p.editHrmEmployee,
    HrmController.editHrmEmployee
);
// **** Export default **** //
export default router;