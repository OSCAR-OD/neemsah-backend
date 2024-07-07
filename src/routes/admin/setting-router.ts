import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import SettingController from "@controller/admin/SettingController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/setting',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    SettingController.add
);

router.get(
    p.all,
    SettingController.all
);
router.get(
    p.single,
    SettingController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    SettingController.edit
);
router.delete(
    p.delete,
    SettingController.delete
);

// **** Export default **** //

export default router;