import {Router} from 'express';
import uploader from "@util/local-uploader";
import RawmController from "@controller/admin/RawmController";

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/rawm',
    uploadTab: '/uploadTab',
    addRawm: '/addRawm',
    addRawmaterial: '/addRawmaterial',
    all: '/all',
    allTab: '/allTab',
    allRawm: '/allRawm',
    allRawmaterials: '/allRawmaterials',
    single: '/single/:customID',
    editRawm: '/editRawm/:customID',
    delete: '/delete/:customID'
} as const;

// **** Routes **** //
router.post(
    p.uploadTab,
    uploader.array("files"),
    RawmController.uploadTab
);
router.get(
    p.all,
    RawmController.all
);
router.get(
    p.allTab,
    RawmController.allTab
);
router.get(
    p.allRawm,
    RawmController.allRawm
);
router.get(
    p.allRawmaterials,
    RawmController.allRawmaterials
);
router.post(
    p.addRawm,
    RawmController.addRawm
);
router.post(
    p.addRawmaterial,
    RawmController.addRawmaterial
);
router.get(
    p.single,
    RawmController.single
);
router.post(
    p.editRawm,
    uploader.array("files"),
    RawmController.editRawm
);
router.delete(
    p.delete,
    RawmController.delete
);

// **** Export default **** //

export default router;