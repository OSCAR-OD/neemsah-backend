import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import ContactController from "@controller/admin/ContactController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/contact',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    ContactController.add
);

router.get(
    p.all,
    ContactController.all
);
router.get(
    p.single,
    ContactController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    ContactController.edit
);
router.delete(
    p.delete,
    ContactController.delete
);

// **** Export default **** //

export default router;