import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import MediaController from "@controller/admin/MediaController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/files',
    upload: '/upload',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.upload,
    uploader.array("files"),
    MediaController.upload
);

router.get(
    p.all,
    MediaController.all
);
router.get(
    p.single,
    MediaController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    MediaController.edit
);
router.delete(
    p.delete,
    MediaController.delete
);

// **** Export default **** //

export default router;