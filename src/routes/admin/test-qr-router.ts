import {Router} from 'express';
// **** Variables **** //
import TestQRController from "@controller/admin/TestQRController";
// Misc
const router = Router();

// Paths
export const p = {
  basePath: '/qr-code',
  add: '/add',
  all: '/all',
  single: '/single/:customID',
  edit: '/edit/:customID',
  delete: '/delete/:customID',
} as const;


// **** Routes **** //
//Register a user
router.post(p.add, TestQRController.add);
router.get(p.all, TestQRController.all);
router.get(p.single, TestQRController.single);
router.post(p.edit, TestQRController.edit);
router.delete(p.delete, TestQRController.delete);

// **** Export default **** //

export default router;