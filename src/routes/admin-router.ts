import { Router } from "express";
import fileRouter, { p as filePaths } from "@routes/admin/file-router";
import contactRouter, { p as contactPaths } from "@routes/admin/contact-router";
import rawmRouter, { p as rawmPaths } from "@routes/admin/rawm-router";
import principalsRouter, { p as principalsPaths } from "@routes/admin/principals-router";
import customersRouter, { p as customersPaths } from "@routes/admin/customers-router";
import ticketRouter, { p as ticketPaths } from "@routes/admin/ticket-router";
import navbarRouter, { p as navbarPaths } from "@routes/admin/navbar-router";
import settingRouter, { p as settingPaths } from "@routes/admin/setting-router";
import popUpRouter, { p as popUpPaths } from "@routes/admin/pop-up-router";
import seoRouter, { p as seoPaths } from "@routes/admin/seo-router";
import heroRouter, { p as heroPaths } from "@routes/admin/hero-router";
import homeRouter, { p as homePaths } from "@routes/admin/home-router";
import crmRouter, { p as crmPaths } from "@routes/admin/crm-router";
import hrmRouter, { p as hrmPaths } from "@routes/admin/hrm-router";
import salesRouter, { p as salesPaths } from "@routes/admin/sales-router";
import serviceRouter, { p as servicePaths } from "@routes/admin/service-router";
import industryRouter, { p as industryPaths } from "@routes/admin/industry-router";
import footerRouter, { p as footerPaths } from "@routes/admin/footer-router";

//test
import testQrRouter, { p as testQrPaths } from "@routes/admin/test-qr-router";
import {auth} from "@util/auth";
export const p = {
    basePath: "/admin",
} as const;
// Init
const apiRouter = Router();
// Add admin api routes.
apiRouter.use(footerPaths.basePath,auth, footerRouter);
apiRouter.use(industryPaths.basePath,auth, industryRouter);
apiRouter.use(homePaths.basePath,auth, homeRouter);
apiRouter.use(crmPaths.basePath,auth, crmRouter);
apiRouter.use(hrmPaths.basePath,auth, hrmRouter);
apiRouter.use(salesPaths.basePath,auth, salesRouter);
apiRouter.use(servicePaths.basePath,auth, serviceRouter);
apiRouter.use(heroPaths.basePath,auth, heroRouter);
apiRouter.use(filePaths.basePath,auth, fileRouter);
apiRouter.use(contactPaths.basePath,auth, contactRouter);
apiRouter.use(rawmPaths.basePath,auth, rawmRouter);
apiRouter.use(principalsPaths.basePath,auth, principalsRouter);
apiRouter.use(customersPaths.basePath,auth, customersRouter);
apiRouter.use(ticketPaths.basePath,auth, ticketRouter);
apiRouter.use(navbarPaths.basePath,auth, navbarRouter);
apiRouter.use(settingPaths.basePath,auth, settingRouter);
apiRouter.use(popUpPaths.basePath,auth, popUpRouter);
apiRouter.use(seoPaths.basePath,auth, seoRouter);
apiRouter.use(testQrPaths.basePath, testQrRouter);
// **** Export default **** //
export default apiRouter;
