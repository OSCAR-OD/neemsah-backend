import {Router} from 'express';
import uploader from "@util/local-uploader";
import CustomersController from "@controller/admin/CustomersController";

// Misc
const router = Router();

// Paths
export const p = {
    basePath: '/customers',
    uploadCustomerTab: '/uploadCustomerTab',
    addCustomer: '/addCustomer',
    allCustTab: '/allCustTab',
    allCustomers: '/allCustomers',
    single: '/single/:customID',
    editCustomer: '/editCustomer/:customID',
    delete: '/delete/:customID'
} as const;

// **** Routes **** //
router.post(
    p.uploadCustomerTab,
    uploader.array("files"),
    CustomersController.uploadCustomerTab
);
router.get(
    p.allCustTab,
    CustomersController.allCustTab
);
router.get(
    p.allCustomers,
    CustomersController.allCustomers
);
router.post(
    p.addCustomer,
    CustomersController.addCustomer
);
router.get(
    p.single,
    CustomersController.single
);
router.post(
    p.editCustomer,
    uploader.array("files"),
    CustomersController.editCustomer
);
router.delete(
    p.delete,
    CustomersController.delete
);

// **** Export default **** //

export default router;