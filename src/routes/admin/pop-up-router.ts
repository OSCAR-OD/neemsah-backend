import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import PopUpController from "@controller/admin/PopUpController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/pop-up',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    PopUpController.add
);

router.get(
    p.all,
    PopUpController.all
);
router.get(
    p.single,
    PopUpController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    PopUpController.edit
);
router.delete(
    p.delete,
    PopUpController.delete
);

// **** Export default **** //

export default router;