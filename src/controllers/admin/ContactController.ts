import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
//To upload file to aws s3 bucket bellow code will be used
// import {initBucket, uploadToS3} from "@util/s3-uploader";
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import ContactService from "@services/ContactService";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';
import { EType } from '@models/Contact';

class ContactController {
    async add(req: Request, res: Response) {
        try {
            const { name, email, phone, message,time, date,title, type } = req.body;
            let validation = new Validator(req.body, {
                name: 'required|string',
                email: 'required|string',
                phone: 'required|string',
                message: 'required|string',
                description: `required|string`,
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const created = await ContactService.add({  name, email, phone, message,time, date,title, type });


            //Save the file info to local database
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
    async all(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await ContactService.all();
            if (page && size) {
                data = await paginate(page, size, data);
            }
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async single(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: any = await ContactService.singleByField({ customID });
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
    async edit(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const {   name, email, phone, message,time, date,title, type} = req.body;
            let validation = new Validator(req.body, {
                name: 'required|string',
                email: 'required|string',
                phone: 'required|string',
                message: 'required|string',
                description: `required|string`,
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const updated = await ContactService.update({ customID }, {   name, email, phone, message,time, date,title, type });
            if (updated)
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
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
            const deleted = await ContactService.destroy({ customID });
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
}

export default new ContactController();