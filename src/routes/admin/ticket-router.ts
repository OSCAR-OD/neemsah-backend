import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import TicketController from "@controller/admin/TicketController";
// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/ticket',
    add: '/add',
    all: '/all',
    single: '/single/:customID',
    edit: '/edit/:customID',
    delete: '/delete/:customID'
} as const;


// **** Routes **** //
router.post(
    p.add,
    TicketController.add
);
router.get(
    p.all,
    TicketController.all
);
router.get(
    p.single,
    TicketController.single
);
router.post(
    p.edit,
    uploader.array("files"),
    TicketController.edit
);
router.delete(
    p.delete,
    TicketController.delete
);

// **** Export default **** //

export default router;