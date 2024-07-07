import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { paginate } from "@util/paginate";
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import Validator from 'validatorjs';
import VisitReport from "@models/VisitReport";
import SalesService from "@services/SalesService";
import CrmService from "@services/CrmService";
import { IVisitReport } from "@models/VisitReport";
import { ICrmProject } from "@models/CrmProject";
import { ICrmContact } from "@models/CrmContact";
import { IFile, IKey } from "@shared/types";
class SalesController {
    async createDailyReport(req: Request, res: Response) {
        try {
            //console.log("Request Body:", req.body);
            const {
                cid,
                companyName,
                personContact,
                pid,
                projectName,
                application,
                flags,
                createdBy,
                description,
                nextFollowUpDate,
                deadline,
                rfqType,
                rsvpData,
                machineInformation,
                financeInformation,
            } = req.body;

            // Validate the incoming request data
            const rules = {
                cid: 'required|string',
                companyName: 'required|string',
                pid: 'required|string',
                projectName: 'required|string',
                application: 'required|string',
                createdBy: 'required|string',
                description: 'required|string',
                nextFollowUpDate: 'required|string',
                personContact: 'required|string',
                flags: 'required|string',
                machineInformation: 'array',
                'machineInformation.*.title': 'string',
                'machineInformation.*.speed': 'string',
                'machineInformation.*.fillingVolume': 'string',
                'machineInformation.*.fillingAccuracy': 'string',
                'machineInformation.*.foilSpecification': 'string',
                'machineInformation.*.packetType': 'string',
                'machineInformation.*.remarks': 'string',
                deadline: 'string',
                rfqType: 'string',
                'rsvpData.rfqTypeID': 'string',
                'rsvpData.title': 'string',
                'rsvpData.description': 'string',
                'rsvpData.sections': 'array',
                'financeInformation.visitType': 'string',
                'financeInformation.visitPlace': 'string',
                'financeInformation.totalCost': 'string',
                'financeInformation.travelCost': 'string',
                'financeInformation.foodCost': 'string',
                'financeInformation.accommodationCost': 'string',
                'financeInformation.otherCost': 'string',
                'financeInformation.extraCostReason': 'string',
            };
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }));
            }

            // Create a new VisitReport document
            const created = await SalesService.createDailyReport({
                cid,
                companyName,
                personContact,
                pid,
                projectName,
                application,
                flags,
                createdBy,
                description,
                nextFollowUpDate,
                deadline,
                rfqType,
                rsvpData,
                machineInformation,
                financeInformation,
            });

            // Save the document to the database
            if (created) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, created));
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
    async allRfqList(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await SalesService.allRfqList();
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
    async viewSingleRFQ(req: Request, res: Response) {
     try {
            const { customID } = req.params;
            const data: IVisitReport = await SalesService.singleByFieldRfqID({ customID });
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
    async editSingleRFQ(req: Request, res: Response) {
        try {
            //console.log("Request Body:", req.body);
            //console.log("Files", req.files);
            const { customID } = req.params;
            const fileInfo: any = {
                claimedBy: req.body.claimedBy,
                status: req.body.status,
                comments: req.body.comments
            }
            const files = req.files as IFile[];
            if (files.length) {
                const file = files[0];
                fileInfo.path = customID + '-' + file.filename.split('-')[1];
            }
            // Validate the incoming request data
             const rules = {
                   claimedBy: 'string',
                   status: 'string',
                   comments: 'string',
         };
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                 return res
                     .status(BAD_REQUEST)
                     .send(failure({ message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }));
            }
            // Update a VisitReport document
             const updated = await SalesService.updateDailyReport({ customID }, fileInfo);
            // Update the document to the database
             if (updated) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, updated));
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
    async allProjectsByField(req: Request, res: Response) {
        try {
            const { assignedEmployee } = req.params;
            const data: ICrmProject = await SalesService.allProjectsByField({ assignedEmployee });
            if (!data) {
                return res
                    .status(OK)
                    .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
            }
            if (data) {
                //console.log("data", data);
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
    async singleProjectByField(req: Request, res: Response) {
        try {
            const { pid } = req.params;
            const data: ICrmProject = await SalesService.singleProjectByField({ pid });
            if (!data) {
                return res
                    .status(OK)
                    .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
            }
            if (data) {
                //console.log("data", data);
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
            const { cid } = req.params;
            const data: ICrmContact = await CrmService.allByFieldContactforSales({ cid });
            if (!data) {

                return res
                    .status(OK)
                    .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
            }
            if (data) {
                //console.log("data", data);
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
    async lastVisitSummaryByField(req: Request, res: Response) {
        try {
            const { pid } = req.params;
            const data: ICrmProject = await SalesService.lastVisitSummaryByField({ pid });
            if (!data) {
                return res
                    .status(OK)
                    .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
            }
            if (data) {
                //console.log("data", data);
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
}

export default new SalesController();
