import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import HomeService from "@services/HomeService";
import SpecialService from "@services/SpecialService";
import ExhibitionService from "@services/ExhibitionService";
import { IIndustryCard } from "@models/IndustryCard";
import { ISpecialCard } from "@models/SpecialCard";
import { IExhibitionCard } from "@models/ExhibitionCard";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';

class HomeController {
    async uploadIndustryCard(req: Request, res: Response) {
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
                const medias = await HomeService.bulkInsert(fileInfos);
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

    async uploadSpecialCard(req: Request, res: Response) {
        try {
            //Check if file exist in request if not then send failure message
            if (!req.files || !req.files.length) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: BAD_REQUEST, errors: { msg: ErrorMessage.HTTP_BAD_REQUEST } }));
            }
            //If multiple file were uploaded put all names on one array
            const fileInfos: ISpecialCard[] = [];
            const files = req.files as IFile[];
            files.map((file) => {
                const fileInfo: ISpecialCard = {
                    path: file.filename,
                    scTitle: req.body.scTitle,
                    scDescription: req.body.scDescription,
                    customID: file.filename.split('-')[0],
                    type: req.body.type,
                }
                fileInfos.push(fileInfo);
                // console.log("fileInfo", fileInfo);
            });
            //Save the file info to local database
            if (fileInfos.length > 0) {
                const medias = await SpecialService.bulkInsert(fileInfos);
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

    async uploadExhibitionCard(req: Request, res: Response) {
        try {
            //Check if file exist in request if not then send failure message
            if (!req.files || !req.files.length) {
                return res
                    .status(BAD_REQUEST)
                    .send(failure({ message: BAD_REQUEST, errors: { msg: ErrorMessage.HTTP_BAD_REQUEST } }));
            }
            //If multiple file were uploaded put all names on one array
            const fileInfos: IExhibitionCard[] = [];
            const files = req.files as IFile[];
            files.map((file) => {
                const fileInfo: IExhibitionCard = {
                    path: file.filename,
                    title: req.body.title,
                    division: req.body.division,
                    date: req.body.date,
                    headline: req.body.headline,
                    description: req.body.description,
                    customID: file.filename.split('-')[0],
                    type: req.body.type,
                }
                fileInfos.push(fileInfo);
                // console.log("fileInfo", fileInfo);
            });
            //Save the file info to local database
            if (fileInfos.length > 0) {
                const medias = await ExhibitionService.bulkInsert(fileInfos);
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

    async all(req: Request, res: Response) {
        try {
            let data: any = await HomeService.all();
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

    async allIndustryCard(req: Request, res: Response) {
        try {
            let data: any = await HomeService.allIndustryCard();
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

    async allSpecialCard(req: Request, res: Response) {
        try {
            let data: any = await SpecialService.allSpecialCard();
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
            let data: any = await ExhibitionService.allExhibitionCard();
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

    async single(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: IIndustryCard = await HomeService.singleByField({ customID });
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

    async singleIndustryCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: IIndustryCard = await HomeService.singleByField({ customID });
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

    async singleSpecialCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: ISpecialCard = await SpecialService.singleByField({ customID });
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

    async singleExhibitionCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const data: IExhibitionCard = await ExhibitionService.singleByField({ customID });
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
            const updated = await HomeService.updateIndustryCard({ customID }, fileInfo);
            if (updated) {
                const data = await HomeService.singleByField({ customID });
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

    async editIndustryCard(req: Request, res: Response) {
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
            const updated = await HomeService.update({ customID }, fileInfo);
            if (updated) {
                const data = await HomeService.singleByField({ customID });
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

    async editSpecialCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const fileInfo: any = {
                scTitle: req.body.scTitle,
                scDescription: req.body.scDescription
            }
            const files = req.files as IFile[];
            if (files.length) {
                const file = files[0];
                fileInfo.path = customID + '-' + file.filename.split('-')[1];
            }
            const updated = await SpecialService.update({ customID }, fileInfo);
            if (updated) {
                const data = await SpecialService.singleByField({ customID });
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

    async editExhibitionCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const fileInfo: any = {
                title: req.body.title,
                division: req.body.division,
                date: req.body.date,
                headline: req.body.headline,
                description: req.body.description,
            }
            const files = req.files as IFile[];
            if (files.length) {
                const file = files[0];
                fileInfo.path = customID + '-' + file.filename.split('-')[1];
            }
            const updated = await ExhibitionService.update({ customID }, fileInfo);
            if (updated) {
                const data = await ExhibitionService.singleByField({ customID });
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

    async delete(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await HomeService.destroy({ customID });
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

    async deleteIndustryCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await HomeService.destroyIndustryCard({ customID });
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

    async deleteSpecialCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await SpecialService.destroySpecialCard({ customID });
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

    async deleteExhibitionCard(req: Request, res: Response) {
        try {
            const { customID } = req.params;
            const deleted = await ExhibitionService.destroyExhibitionCard({ customID });
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

export default new HomeController();