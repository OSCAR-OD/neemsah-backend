import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import ServicePgService from "@services/ServicePgService";
import EmployeeService from "@services/EmployeeService";
import { IEmployee } from "@models/Employee";
import { IIndustryCard } from "@models/IndustryCard";

import { IExhibitionCard } from "@models/ExhibitionCard";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';

class ServiceController {
    async uploadServiceCard(req: Request, res: Response) {
        try {
            //Check if file exist in request if not then send failure message
            if (!req.files || !req.files.length) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: BAD_REQUEST, errors: { msg: ErrorMessage.HTTP_BAD_REQUEST } }));
            }
            //If multiple file were uploaded put all names on one array
            const fileInfos: IIndustryCard[] = [];
            const files = req.files as IFile[];
            files.map((file) => {
                const fileInfo: IIndustryCard = {
                    path: file.filename,
                    iName: req.body.iName,
                    icTitle: req.body.icTitle,
                    icDescription: req.body.icDescription,
                    customID: file.filename.split('-')[0],
                    type: req.body.type,
                }
                fileInfos.push(fileInfo);
                // console.log("fileInfo", fileInfo);
            });
            //Save the file info to local database
            if (fileInfos.length > 0) {
                const medias = await ServicePgService.bulkInsert(fileInfos);
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
    async addServiceCard(req: Request, res: Response) {
        try {
            const { title, description, images, position} = req.body;
            let validation = new Validator(req.body, {
                title: 'required|string',
                description: 'required|string',
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
            const created = await ServicePgService.add({title, description, images, position});
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
    async addEmployeeCard (req: Request, res: Response) {
        try {
            const {position, image, name, designation, email, phone, address} = req.body;
            let validation = new Validator(req.body, {
                name: 'required|string',
                image: 'required|string',
                position: 'required|string',
                designation: 'required|string',
                email: 'required|string',
                phone: 'required|string',
                address: 'string',
                });
                //console.log("email", email);
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const created = await EmployeeService.add({ position, image, name, designation, email, phone, address});
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
            let data: any = await ServicePgService.all();
            const { page, size }: any = req.query;
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
    async allServiceCard(req: Request, res: Response) {
        try {
            let data: any = await ServicePgService.allServiceCard();
            const { page, size }: any = req.query;
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
    async allEmployeeCard (req: Request, res: Response) {
        try {
            const { page, size,position }: any = req.query;
            let data: any = await EmployeeService.allByPosition(position);
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
            const data: IIndustryCard = await ServicePgService.singleByField({ customID });
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
    async singleServiceCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: IEmployee = await ServicePgService.singleByField({ customID });
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
    async singleEmployeeCard (req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: any = await EmployeeService.singleByField({ customID });
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
            const fileInfo: any = {
                iName: req.body.iName,
                icTitle: req.body.icTitle,
                icDescription: req.body.icDescription
            }
            const files = req.files as IFile[];
            if (files.length) {
                const file = files[0];
                fileInfo.path = customID + '-' + file.filename.split('-')[1];
            }
            const updated = await ServicePgService.updateIndustryCard({ customID }, fileInfo);
            if (updated) {
                const data = await ServicePgService.singleByField({ customID });
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, data));
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
    async editServiceCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const fileInfo: any = {
                iName: req.body.iName,
                icTitle: req.body.icTitle,
                icDescription: req.body.icDescription
            }
            const files = req.files as IFile[];
            if (files.length) {
                const file = files[0];
                fileInfo.path = customID + '-' + file.filename.split('-')[1];
            }
            const updated = await ServicePgService.update({ customID }, fileInfo);
            if (updated) {
                const data = await ServicePgService.singleByField({ customID });
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, data));
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
    async editEmployeeCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const {position, image, name, designation, email, phone} = req.body;
           let validation = new Validator(req.body, {
            name: 'required|string',
            image: 'required|string',
            position: 'required|string',
            designation: 'required|string',
            email: 'required|string',
            phone: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }
            const updated = await EmployeeService.update({ customID }, { position, image, name, designation, email, phone });
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
            const deleted = await ServicePgService.destroy({ customID });
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
    async deleteServiceCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await ServicePgService.destroyIndustryCard({ customID });
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
    async deleteEmployeeCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await EmployeeService.destroy({ customID });
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

export default new ServiceController();