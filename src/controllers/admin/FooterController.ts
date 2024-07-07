import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import FooterService from "@services/FooterService";
import { IFooter } from "@models/Footer";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';
import { Types } from "mongoose";

class FooterController {
    async addFooterNav(req: Request, res: Response) {
        try {
            const {name, slug, parent, grandParent} = req.body;
            let validation = new Validator(req.body, {
                name: 'required|string',
                slug: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            // Convert parent and grandParent to ObjectId if they are not null
            const parentId = parent ? new Types.ObjectId(parent) : null;
            const grandParentId = grandParent ? new Types.ObjectId(grandParent) : null;

            const created = await FooterService.addFooterNav({ name, slug, parent: parentId, grandParent: grandParentId });
            // Save the file info to local database
            if (created) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            } else {
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: ErrorMessage.HTTP_UNSUPPORTED_MEDIA_TYPE, errors: {} }));
            }
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async allFooterNav(req: Request, res: Response) {
        try {
            let data: any = await FooterService.allFooterNav();
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async editFooterNav(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const {name, slug, parent, grandParent} = req.body;
            let validation = new Validator(req.body, {
                name: 'required|string',
                slug: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            // Convert parent and grandParent to ObjectId if they are not null
            const parentId = parent ? new Types.ObjectId(parent) : null;
            const grandParentId = grandParent ? new Types.ObjectId(grandParent) : null;

            const updated = await FooterService.updateFooterNav({ customID }, {name, slug, parent: parentId, grandParent: grandParentId});
            if (updated) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            }
            else
                return res
                    .status(UNPROCESSABLE_ENTITY)
                    .send(success(ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, req.body));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await FooterService.destroy({ customID });
            if (deleted)
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            else
                return res
                    .status(UNPROCESSABLE_ENTITY)
                    .send(failure({ message: ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, errors: {} }));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async deleteFooterNav(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await FooterService.deleteFooterNav({ customID });
            if (deleted)
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            else
                return res
                    .status(UNPROCESSABLE_ENTITY)
                    .send(failure({ message: ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, errors: {} }));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async singleFooterNav(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: IFooter = await FooterService.singleByField({ customID });
            if (!data) {
                return res
                    .status(OK)
                    .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
            }
            if (data) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, data));
            }
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    public async getChildrenOfGrandParent(req: Request, res: Response) {
        try {
            const { grandParentId } = req.params;
            const data: any = await FooterService.getChildrenOfGrandParent(grandParentId);
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    public async getGrandParent(req: Request, res: Response) {
        try {
            const data: any = await FooterService.getGrandParent();
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
}

export default new FooterController();