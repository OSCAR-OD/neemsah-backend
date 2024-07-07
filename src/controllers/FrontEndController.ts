import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
//To upload file to aws s3 bucket bellow code will be used
// import {initBucket, uploadToS3} from "@util/s3-uploader";
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import FrontEndService from "@services/FrontEndService";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';
import ContactService from '@services/ContactService';
import TicketService from '@services/TicketService';
import Media, { IMedia } from "@models/Media";
import mailer from "@util/mailer";
import customerEmailTemplate from "@views/emails/Customer";
import employeeEmailTemplate from "@views/emails/Eployees";
class FrontEndController {
    async allHeroByPosition(req: Request, res: Response) {
        try {
            const { page, size, position }: any = req.query;
            let data: any = await FrontEndService.allByPosition(position);
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
    async allEmployeeByPosition(req: Request, res: Response) {
        try {
            const { page, size, position }: any = req.query;
            let data: any = await FrontEndService.allEmployeeByPosition(position);
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
    async allIndustryCard(req: Request, res: Response) {
        try {
            let data: any = await FrontEndService.allIndustryCard();
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
    async allIndustryNav(req: Request, res: Response) {
        try {
            let data: any = await FrontEndService.allIndustryNav();
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async allSpecialCard(req: Request, res: Response) {
        try {
            let data: any = await FrontEndService.allSpecialCard();
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
    async allExhibitionCard(req: Request, res: Response) {
        try {
            let data: any = await FrontEndService.allExhibitionCard();
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
            let data: any = await FrontEndService.allServiceCard();
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
    async addContact(req: Request, res: Response) {
        try {
            const { name, email, phone, description } = req.body;
            let validation = new Validator(req.body, {
                name: 'required|string',
                email: 'required|string',
                phone: 'required|string',
                description: 'required|string'

            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const created = await ContactService.add({ name, email, phone, description});
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
    async allPrincipals(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await FrontEndService.allPrincipal();
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
    async allCustomers(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await FrontEndService.allCustomer();
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
    async allRawmaterials(req: Request, res: Response) {
        try {
            const { page, size, type }: any = req.query;
            let data: any = await FrontEndService.allRawmaterial();
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
    async addTicket(req: Request, res: Response) {
        try {
            const { service, description, serial, name, email, phone, company } = req.body;
            let validation = new Validator(req.body, {
                service: 'required|string',
                description: 'required|string',
                serial: 'required|string',
                name: 'required|string',
                email: 'required|string',
                phone: 'required|string',
                company: 'required|string',
            });
            if (validation.fails()) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure(
                        { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
                    ));
            }

            const created = await TicketService.add({ service, description, serial, name, email, phone, company});
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
    async singlePopUp(req: Request, res: Response) {
        try {
            const { position } = req.params;
            const { page, size }: any = req.query;
            let data: any = await FrontEndService.singlePopUpByField({ position });
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
    async singleSeo(req: Request, res: Response) {
        try {
            const { position } = req.params;
            const { page, size }: any = req.query;
            let data: any = await FrontEndService.singleSeoByField({ position });
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
    // async getSetting(req: Request, res: Response) {
    //     try {
    //         const { customID } = req.params;
    //         let data: any = await FrontEndService.getSetting({ customID });
    //         const { page, size }: any = req.query;
    //         if (page && size) {
    //             data = await paginate(page, size, data);
    //         }
    //         return res
    //             .status(OK)
    //             .send(success(ErrorMessage.HTTP_OK, data));
    //     } catch (err) {
    //         return res
    //             .status(INTERNAL_SERVER_ERROR)
    //             .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
    //     }
    // }
    async getSetting(req: Request, res: Response) {
        try {
            let data: any = await FrontEndService.getSetting();
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    async allFooterLink(req: Request, res: Response) {
        try {
            let data: any = await FrontEndService.allFooterLink();
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, data));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
    //get test data
    async allMediaTestData(req: Request, res: Response) {
        // return res.json("All Media");
        try {
            const { page, size }: any = req.query;
            let data: any = await Media.find({ type: "test" }).select('-__v').sort({ createdAt: 'desc' });

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
    async test(req: Request, res: Response) {
        try {
            const html = customerEmailTemplate({
                name: "Sir",
                date: "LOL",
                time: "LOL",
                timezone: "TimeZone",
                agenda: "Agenda"
            });
            const mail = mailer.mail('radoan.cse@gmail.com', 'Test Email', html);
            return res.status(200).send({ msg: "Here it comes!" })

        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
        }
    }
  }

export default new FrontEndController();