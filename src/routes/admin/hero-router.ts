import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import HeroController from "@controller/admin/HeroController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/hero',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    HeroController.add
);

router.get(
    p.all,
    HeroController.all
);
router.get(
    p.single,
    HeroController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    HeroController.edit
);
router.delete(
    p.delete,
    HeroController.delete
);

// **** Export default **** //

export default router;