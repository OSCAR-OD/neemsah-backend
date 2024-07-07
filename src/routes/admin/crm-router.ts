import { Router } from 'express';
//Uploading configuration for file using multer
import uploader from "@util/local-uploader";
import CrmController from "@controller/admin/CrmController";

// **** Variables **** //

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/crm',
    allRfqType: '/allRfqType',
    addRfqType: '/add-rfq-type',
    singleRfqType: '/singleRfqType/:customID',
    allByFieldRfqType: '/allByFieldRfqType/:rfqFormat',
    deleteRfqType: '/deleteRfqType/:customID',
    submitRSVPForm: '/submitRSVPForm',
    singleRSVP: '/singleRSVP/:rfqTypeID',
    singleContact: '/singleContact/:customID',
    allContactforSales: '/allContactforSales/:company',
    allContacts: '/allContacts',
    addContact: '/addContact',
    editContact: '/editContact/:customID',
    deleteContact: '/deleteContact/:customID',
    allCustomers: '/allCustomers',
    addCustomer: '/addCustomer',
    editCustomer: '/editCustomer/:customID',
    deleteCustomer: '/deleteCustomer/:customID',
    allProjects: '/allProjects',
    addProject: '/addProject',
    editProject: '/editProject/:customID',
    deleteProject: '/deleteProject/:customID',
} as const;

// **** Routes **** //
router.get(
    p.allCustomers,
    CrmController.allCustomers
);
router.post(
    p.addCustomer,
    CrmController.addCustomer
);
router.post(
    p.addRfqType,
    CrmController.addRfqType
);
router.get(
    p.allRfqType,
    CrmController.allRfqType
);
router.delete(
    p.deleteRfqType,
    CrmController.deleteRfqType
);
router.get(
    p.singleRfqType,
    CrmController.singleRfqType
);
router.get(
    p.allByFieldRfqType,
    CrmController.allByFieldRfqType
);
router.post(
    p.submitRSVPForm,
    CrmController.submitRSVPForm
);
router.get(
    p.singleRSVP,
    CrmController.singleRSVP
);
router.get(
    p.singleContact,
    CrmController.singleContact
);
router.get(
    p.allContactforSales,
    CrmController.allContactforSales
);
router.post(
    p.editCustomer,
    uploader.array("files"),
    CrmController.editCustomer
);
router.delete(
    p.deleteCustomer,
    CrmController.deleteCustomer
);
router.get(
    p.allProjects,
    CrmController.allProjects
);
router.post(
    p.addProject,
    CrmController.addProject
);
router.post(
    p.editProject,
    CrmController.editProject
);
router.delete(
    p.deleteProject,
    CrmController.deleteProject
);
router.get(
    p.allContacts,
    CrmController.allContacts
);
router.post(
    p.addContact,
    CrmController.addContact
);
router.delete(
    p.deleteContact,
    CrmController.deleteContact
);
// **** Export default **** //
export default router;