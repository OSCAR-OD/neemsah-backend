import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import SeoController from "@controller/admin/SeoController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/seo',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    SeoController.add
);

router.get(
    p.all,
    SeoController.all
);
router.get(
    p.single,
    SeoController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    SeoController.edit
);
router.delete(
    p.delete,
    SeoController.delete
);

// **** Export default **** //

export default router;