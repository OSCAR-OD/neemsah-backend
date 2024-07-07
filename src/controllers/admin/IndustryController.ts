import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import IndustryService from "@services/IndustryService";
import { IIndustry } from "@models/Industry";
import { IIndustryPage } from "@models/IndustryPage";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';
import { Types } from "mongoose";
import { IRefferenceImage } from '@models/RefferenceImage';
class IndustryController {
  async uploadRefferenceImage(req: Request, res: Response) {
    try {
      if (!req.files || !req.files.length) {
        return res
          .status(BAD_REQUEST)
          .send(failure({ message: BAD_REQUEST, errors: { msg: ErrorMessage.HTTP_BAD_REQUEST } }));
      }
      const fileInfos: IRefferenceImage[] = [];
      const files = req.files as IFile[];
      files.map((file) => {
        const fileInfo: IRefferenceImage = {
          path: file.filename,
          name: req.body.name,
          eventKey: req.body.eventKey,
          customID: file.filename.split('-')[0],
          type: req.body.type,
        }
        fileInfos.push(fileInfo);
        //console.log("fileInfo", fileInfo);
      });
      //Save the file info to local database
      if (fileInfos.length > 0) {
        const medias = await IndustryService.bulkInsertRefferenceImage(fileInfos);
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
  async allRefferenceImage(req: Request, res: Response){
    try {
        let data : any = await IndustryService.allRefferenceImage();
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

  async addIndustryNav(req: Request, res: Response) {
    try {
      const { name, slug, parent, grandParent } = req.body;
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

      const created = await IndustryService.addIndustryNav({
        name,
        slug,
        parent: parentId,
        grandParent: grandParentId
      });
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

  async addIndustryPage(req: Request, res: Response) {
    try {
      //console.log("req.body", req.body);
      const {
        industryID,
        heroTitle,
        heroDescription,
        heroImage,
        industryImage,
        industryDescription,
        productionProcessTitle,
        productionProcessSubTitle,
        processStart,
        processEnd,
        processes,
        refLayoutTitle,
        refLayoutImage,
        refLayoutMachinePositions
      } = req.body;
      let validation = new Validator(req.body, {
        industryID: 'required',
        heroTitle: 'string',
        heroDescription: 'string',
        heroImage: 'string|required',
        industryImage: 'string|required',
        industryDescription: 'string',
        productionProcessTitle: 'string',
        productionProcessSubTitle: 'string',
        "processStart.*.title": 'required|string',
        "processStart.*.description": 'string',
        "processEnd.*.title": 'required|string',
        "processEnd.*.description": 'string',
        processes: 'array|required',
        refLayoutTitle: 'string',
        refLayoutImage: 'string|required',
        refLayoutMachinePositions: 'array',
      });
      if (validation.fails()) {
        return res
          .status(BAD_REQUEST)
          .send(failure(
            { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
          ));
      }
      const created = await IndustryService.addIndustryPage({
        industryID,
        heroTitle,
        heroDescription,
        heroImage,
        industryImage,
        industryDescription,
        productionProcessTitle,
        productionProcessSubTitle,
        processStart,
        processEnd,
        processes,
        refLayoutTitle,
        refLayoutImage,
        refLayoutMachinePositions
      });
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

  async all(req: Request, res: Response) {
    try {
      let data: any = await IndustryService.all();
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
      let data: any = await IndustryService.allIndustryNav();
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
      const data: IIndustry = await IndustryService.singleByField({ customID });
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

  async singleIndustryNav(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const data: IIndustry = await IndustryService.singleByField({ customID });
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

  async singleIndustryPage(req: Request, res: Response) {
    try {
      const { industryID } = req.params;
      const data: IIndustryPage = await IndustryService.singleByIndustryID({ industryID });
      if (!data) {
        return res
          .status(OK)
          .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
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

  async edit(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const fileInfo: any = {
        iName: req.body.iName,
        icTitle: req.body.icTitle,
        icDescription: req.body.icDescription
      };
      const files = req.files as IFile[];
      if (files.length) {
        const file = files[0];
        fileInfo.path = customID + '-' + file.filename.split('-')[1];
      }
      const updated = await IndustryService.updateIndustryCard({ customID }, fileInfo);
      if (updated) {
        const data = await IndustryService.singleByField({ customID });
        return res
          .status(OK)
          .send(success(ErrorMessage.HTTP_OK, data));
      } else
        return res
          .status(UNPROCESSABLE_ENTITY)
          .send(success(ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, req.body));
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send(failure({ message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }));
    }
  }

  async editIndustryNav(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const { name, slug, parent, grandParent } = req.body;
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

      const updated = await IndustryService.updateIndustryNav({ customID }, {
        name,
        slug,
        parent: parentId,
        grandParent: grandParentId
      });
      if (updated) {
        return res
          .status(OK)
          .send(success(ErrorMessage.HTTP_OK, req.body));
      } else
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
      const deleted = await IndustryService.destroy({ customID });
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

  async deleteIndustryNav(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const deleted = await IndustryService.deleteIndustryNav({ customID });
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

  public async getChildrenOfGrandParent(req: Request, res: Response) {
    try {
      const { grandParentId } = req.params;
      const data: any = await IndustryService.getChildrenOfGrandParent(grandParentId);
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
      const data: any = await IndustryService.getGrandParent();
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

export default new IndustryController();