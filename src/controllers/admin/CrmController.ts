import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import CrmService from "@services/CrmService";
import { ICrmRfqType } from "@models/CrmRfqType";
import { ICrmRSVP } from "@models/CrmRSVP";
import { ICrmContact } from "@models/CrmContact";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';

class CrmController {
    async singleRfqType(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: ICrmRfqType = await CrmService.singleByFieldRfqType({ customID });
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
    async allByFieldRfqType(req: Request, res: Response) {
        try {
            const { rfqFormat } = req.params;
            const data: ICrmRfqType = await CrmService.allByFieldRfqType({ rfqFormat });
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
    async singleRSVP(req: Request, res: Response) {
        try {
            const { rfqTypeID } = req.params;
            const data: ICrmRSVP = await CrmService.singleByFieldRfqTypeID({ rfqTypeID });
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
    async addRfqType(req: Request, res: Response) {
        try {
            const { rfqType, rfqFormat, creationDate, description, createdBy } = req.body;
            let validation = new Validator(req.body, {
                rfqType: 'required|string',
                rfqFormat: 'string',
                creationDate: 'required|string',
                description: 'string',
                createdBy: 'required|string',
            });
            //console.log("req.body", req.body);
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }
            const created = await CrmService.addRfqType({ rfqType, rfqFormat, creationDate, description, createdBy});
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
    async submitRSVPForm(req: Request, res: Response) {
        try {
            const { rfqTypeID, title, description, sections } = req.body;
            //console.log("Request Body:", req.body);
            let validation = new Validator(req.body, {
                rfqTypeID: 'required|string',
                title: 'required|string',
                description: 'string',
                sections: 'array|required',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }
            const data: ICrmRSVP = await CrmService.singleByFieldRfqTypeID({ rfqTypeID });
            if (!data) {
                //console.log("Creating new RSVP:", req.body);
                const created = await CrmService.createRSVP({ rfqTypeID, title, description, sections });
                return res.status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            } else {
                //console.log("Updating existing RSVP:", req.body);
                const updated = await CrmService.updateRSVP({ rfqTypeID }, { rfqTypeID, title, description, sections });
                return res.status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            }
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async allRfqType(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await CrmService.allRfqType();
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
    async deleteRfqType(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await CrmService.destroyRfqType(customID);
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
    async singleContact(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: ICrmContact = await CrmService.singleByFieldContact({ customID });
            if (!data) {
                // console.log("data", data);
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
    async allContactforSales(req: Request, res: Response) {
        try {
            const { company } = req.params;
            const data: ICrmContact = await CrmService.allByFieldContactforSales({ company });
            if (!data) {

                return res
                    .status(OK)
                    .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
            }
            if (data) {
                // console.log("data", data);
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
    async allCustomers(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await CrmService.allCustomer();
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
    async addCustomer(req: Request, res: Response) {
        try {
            const { companyName, cid, creationDate, description, images, position } = req.body;
            let validation = new Validator(req.body, {
                companyName: 'required|string',
                cid: 'required|string',
                creationDate: 'required|string',
                description: 'string',
                images: 'required|array',
                position: 'required|string',
            });
            //console.log("req.body", req.body);
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const created = await CrmService.addCustomer({ companyName, cid, creationDate, description, position, images });
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
    async editCustomer(req: Request, res: Response) {
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

            const updated = await CrmService.update({ customID }, { name, email, phone, message, time, date, title, type });
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
    async deleteCustomer(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await CrmService.destroy({ customID });
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
    async allProjects(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await CrmService.allProject();
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
    async addProject(req: Request, res: Response) {
        try {
            const { pid, projectName, cid, companyName, application, assignedEmployee, initiationDate, description, createdBy, lastEditedBy } = req.body;
            let validation = new Validator(req.body, {
                pid: 'required|string',
                projectName: 'required|string',
                cid: 'string',
                companyName: 'required|string',
                application: 'string',
                assignedEmployee: 'string',
                initiationDate: 'string',
                description: 'string',
                createdBy: 'string',
                lastEditedBy: 'string',
            });
            //console.log("req.body", req.body);
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const created = await CrmService.addProject({ pid, projectName, cid, companyName, application, assignedEmployee, initiationDate, description, createdBy, lastEditedBy });
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
    async deleteProject(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await CrmService.deleteProject(customID);
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
    async editProject(req: Request, res: Response) {
        // try {
        //     const { customID } = req.params;
        //     const { name, email, phone, message, time, date, title, type } = req.body;
        //     let validation = new Validator(req.body, {
        //         name: 'required|string',
        //         email: 'required|string',
        //         phone: 'required|string',
        //         message: 'required|string',
        //         description: `required|string`,
        //     });
        //     if (validation.fails()) {
        //         return res
        //             .status(BAD_REQUEST)
        //             .send(failure(
        //                 { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
        //             ));
        //     }

        //     const updated = await CrmService.updateProject({ customID }, { name, email, phone, message, time, date, title, type });
        //     if (updated)
        //         return res
        //             .status(OK)
        //             .send(success(ErrorMessage.HTTP_OK, req.body));
        //     else
        //         return res
        //             .status(UNPROCESSABLE_ENTITY)
        //             .send(success(ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, req.body));
        // } catch (err) {
        //     return res
        //         .status(INTERNAL_SERVER_ERROR)
        //         .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        // }
    }
    async allContacts(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await CrmService.allContact();
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
    async addContact(req: Request, res: Response) {
        try {
            const { contactName, companyName, cid, designation, contactEmail, contactPhone, note, addedBy } = req.body;
            //console.log("req.body", req.body);
            let validation = new Validator(req.body, {
                contactName: 'required',
                companyName: 'required|string',
                cid: 'required|string',
                contactPhone: 'required|string',
                contactEmail: 'required|string',
                designation: 'required|string',
                note: 'string',
                addedBy: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }
            const created = await CrmService.addContact({ contactName, companyName, cid, designation, contactEmail, contactPhone, note, addedBy });
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
    async deleteContact(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await CrmService.deleteContact(customID);
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

export default new CrmController();