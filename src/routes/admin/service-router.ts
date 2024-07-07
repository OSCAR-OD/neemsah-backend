import {Router} from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import ServiceController from "@controller/admin/ServiceController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/service',
    uploadServiceCard: '/service-card-upload',
    addServiceCard: '/addServiceCard',
    addEmployeeCard: '/employee-card-add',
    all: '/all',
    allServiceCard: '/allServiceCard',
    allEmployeeCard: '/allEmployeeCard',
    single: '/single/:customID',
    singleServiceCard: '/serviceCard/single/:customID',
    singleEmployeeCard: '/employeeCard/single/:customID',
    edit: '/edit/:customID',
    editServiceCard: '/editServiceCard/:customID',
    editEmployeeCard: '/editEmployeeCard/:customID',
    delete: '/delete/:customID',
    deleteServiceCard: '/deleteServiceCard/:customID',
    deleteEmployeeCard: '/deleteEmployeeCard/:customID',  
} as const;

// **** Routes **** //
router.post(
    p.addServiceCard,
    ServiceController.addServiceCard
);

router.post(
    p.uploadServiceCard,
    uploader.array("files"),
    ServiceController.uploadServiceCard,
);
router.post(
    p.addEmployeeCard,
    uploader.array("files"),
    ServiceController.addEmployeeCard,
);
router.get(
    p.all,
    ServiceController.all
);
router.get(
    p.allServiceCard,
    ServiceController.allServiceCard
);
router.get(
    p.allEmployeeCard,
    ServiceController.allEmployeeCard
);
router.get(
    p.single,
    ServiceController.single
);
router.get(
    p.singleServiceCard,
    ServiceController.singleServiceCard
);
router.get(
    p.singleServiceCard,
    ServiceController.singleServiceCard
);
router.get(
    p.singleEmployeeCard,
    ServiceController.singleEmployeeCard
);
router.post(
    p.edit,
    uploader.array("files"),
    ServiceController.edit
);
router.post(
    p.editServiceCard,
    uploader.array("files"),
    ServiceController.editServiceCard
);
router.post(
    p.editEmployeeCard,
    uploader.array("files"),
    ServiceController.editEmployeeCard
);
router.delete(
    p.delete,
    ServiceController.delete
);
router.delete(
    p.deleteServiceCard,
    ServiceController.deleteServiceCard
);
router.delete(
    p.deleteEmployeeCard,
    ServiceController.deleteEmployeeCard
);
// **** Export default **** //
export default router;