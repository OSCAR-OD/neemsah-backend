import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
//To upload file to aws s3 bucket bellow code will be used
// import {initBucket, uploadToS3} from "@util/s3-uploader";
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import RTabService from "@services/RTabService";
import RawmService from "@services/RawmService";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';
import { EType } from '@models/Contact';
import { IRTab } from '@models/RTab';

class RawmController {
    async uploadTab(req: Request, res: Response) {
        try {
            //Check if file exist in request if not then send failure message
            if (!req.files || !req.files.length) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: BAD_REQUEST, errors: { msg: ErrorMessage.HTTP_BAD_REQUEST } }));
            }
            //If multiple file were uploaded put all names on one array
            const fileInfos: IRTab[] = [];
            const files = req.files as IFile[];
            files.map((file) => {
                const fileInfo: IRTab = {
                    path: file.filename,
                    title: req.body.title,
                    description: req.body.description,
                    corigin: req.body.corigin,
                    customID: file.filename.split('-')[0],
                    type: req.body.type,
                }
                fileInfos.push(fileInfo);
                //console.log("fileInfo", fileInfo);
            });
            //Save the file info to local database
            if (fileInfos.length > 0) {
                const medias = await RTabService.bulkInsert(fileInfos);
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, fileInfos));
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
    async single(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: any = await RTabService.singleByField({ customID });
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
    async addRawm(req: Request, res: Response) {
        try {
            const { tbName, eventKey, division, tbTitle, image, position, title, name, description, cOrigin } = req.body;
            let validation = new Validator(req.body, {
                tbName: 'required|string',
                eventKey: 'required|string',
                division: 'required|string',
                tbTitle: 'required|string',
                image: 'required|string',
                position: 'required|string',
                title: 'required|string',
                name: 'required|string',
                description: 'required|string',
                cOrigin: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }
            console.log("req.body", req.body);
            const created = await RawmService.add({tbName, eventKey, division, tbTitle, image, position, title, name, description, cOrigin});
            //Save the file info to local database
            if (created) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            } else {
                console.log("not created");
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: ErrorMessage.HTTP_UNSUPPORTED_MEDIA_TYPE, errors: {} }));
            }
        } catch (err) {
            console.log("not created 1");
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async addRawmaterial(req: Request, res: Response) {
        try {
            const {  tbName, eventKey, division, tbTitle, images, position} = req.body;
            let validation = new Validator(req.body, {
                tbName: 'required|string',
                eventKey: 'required|string',
                division: 'required|string',
                tbTitle: 'required|string',
                images: 'required|array',
                position: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }
            const created = await RawmService.add({ tbName, eventKey, division, tbTitle, position, images });
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
    async allRawmaterials(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await RawmService.allRawmaterial();
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
    async all(req: Request, res: Response){
        try {
            let data : any = await RawmService.all();
            const {page, size}:any = req.query;
            if(page && size){
                data = await paginate(page, size, data);
            }
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }
    async allTab(req: Request, res: Response){
        try {
            let data : any = await RTabService.all();
            const {page, size}:any = req.query;
            if(page && size){
                data = await paginate(page, size, data);
            }
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }
    async allRawm(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await RawmService.allRawm();
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
    async editRawm(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const { name, email, phone, message, time, date, title, type } = req.body;
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

            const updated = await RawmService.update({ customID }, { name, email, phone, message, time, date, title, type });
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
            const deleted = await RawmService.destroy({ customID });
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

export default new RawmController();