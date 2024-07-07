import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import navbarController from "@controller/admin/NavbarController";
// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/navbar',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    navbarController.add
);
router.get(
    p.all,
    navbarController.all
);
router.get(
    p.single,
    navbarController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    navbarController.edit
);
router.delete(
    p.delete,
    navbarController.delete
);

// **** Export default **** //

export default router;