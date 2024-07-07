import {Router} from 'express';
import uploader from "@util/local-uploader";
import PrincipalsController from "@controller/admin/PrincipalsController";

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/principals',
    uploadPrincipalTab: '/uploadPrincipalTab',
    addPrincipal: '/addPrincipal',
    allPrinTab: '/allPrinTab',
    allPrincipals: '/allPrincipals',
    single: '/single/:customID',
    editPrincipal: '/editPrincipal/:customID',
    delete: '/delete/:customID'
} as const;

// **** Routes **** //
router.post(
    p.uploadPrincipalTab,
    uploader.array("files"),
    PrincipalsController.uploadPrincipalTab
);
router.get(
    p.allPrinTab,
    PrincipalsController.allPrinTab
);
router.get(
    p.allPrincipals,
    PrincipalsController.allPrincipals
);
router.post(
    p.addPrincipal,
    PrincipalsController.addPrincipal
);
router.get(
    p.single,
    PrincipalsController.single
);
router.post(
    p.editPrincipal,
    uploader.array("files"),
    PrincipalsController.editPrincipal
);
router.delete(
    p.delete,
    PrincipalsController.delete
);

// **** Export default **** //

export default router;