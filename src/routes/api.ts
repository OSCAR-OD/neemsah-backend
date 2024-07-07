import {Router} from 'express';
import authRouter, {p as authPaths} from "@routes/auth-router";
import adminRouter, {p as adminPath} from "@routes/admin-router";
import frontEndRouter, {p as frontendPath} from "@routes/frontend-router";

// Init
const apiRouter = Router();

/*================================================
 Add api routes
================================================*/
apiRouter.use(authPaths.basePath, authRouter);
// TODO: Add admin middleware to it for checking admin role for all routes
apiRouter.use(adminPath.basePath, adminRouter);
apiRouter.use(frontendPath.basePath, frontEndRouter);

// **** Export default **** //

export default apiRouter;
