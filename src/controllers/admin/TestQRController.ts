import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
//To upload file to aws s3 bucket bellow code will be used
// import {initBucket, uploadToS3} from "@util/s3-uploader";
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } =
  StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import TestQRService from "@services/TestQRService";
import { paginate } from "@util/paginate";
import Validator from "validatorjs";

class TestQRController {
  async add(req: Request, res: Response) {
    try {
      const { title, link , type  } =
        req.body;
      let validation = new Validator(req.body, {
        title: "required|string",
        link:"required|string",
        type:"required|string"
      });
      if (validation.fails()) {
        return res.status(BAD_REQUEST).send(
          failure({
            message: ErrorMessage.HTTP_BAD_REQUEST,
            errors: validation.errors.errors,
          })
        );
      }

      const created = await TestQRService.add({
        title,link,type
      });
      if (created)
        return res.status(OK).send(success(ErrorMessage.HTTP_OK, req.body));
      else
        return res
          .status(UNPROCESSABLE_ENTITY)
          .send(success(ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, req.body));
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).send(
        failure({
          message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
          errors: err,
        })
      );
    }
  }

  async all(req: Request, res: Response) {
    try {

      const { page, size, type }: any = req.query;
      let data: any = await TestQRService.allByType(type);
      return res.json(data);

      if (page && size) {
        data = await paginate(page, size, data);
      }
      return res.status(OK).send(success(ErrorMessage.HTTP_OK, data));
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).send(
        failure({
          message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
          errors: err,
        })
      );
    }
  }

  async single(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      console.log(customID);
      const data: any = await TestQRService.singleByField({ customID });
      if (!data) {
        return res
          .status(OK)
          .send(failure({ message: ErrorMessage.HTTP_NO_CONTENT, errors: {} }));
      }
      if (data) {
        return res.status(OK).send(success(ErrorMessage.HTTP_OK, data));
      }
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).send(
        failure({
          message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
          errors: err,
        })
      );
    }
  }
  async edit(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const { title,link} =
        req.body;

      let validation = new Validator(req.body, {
        
      });
      if (validation.fails()) {
        return res.status(BAD_REQUEST).send(
          failure({
            message: ErrorMessage.HTTP_BAD_REQUEST,
            errors: validation.errors.errors,
          })
        );
      }

      const updated = await TestQRService.update(
        { customID },
        {
            title, link
        }
      );
      if (updated) {
        const data = await TestQRService.singleByField({ customID });
        return res.status(OK).send(success(ErrorMessage.HTTP_OK, data));
      } else
        return res
          .status(UNPROCESSABLE_ENTITY)
          .send(success(ErrorMessage.HTTP_UNPROCESSABLE_ENTITY, req.body));
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).send(
        failure({
          message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
          errors: err,
        })
      );
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const deleted = await TestQRService.destroy({ customID });
      if (deleted)
        return res.status(OK).send(success(ErrorMessage.HTTP_OK, req.body));
      else
        return res.status(UNPROCESSABLE_ENTITY).send(
          failure({
            message: ErrorMessage.HTTP_UNPROCESSABLE_ENTITY,
            errors: {},
          })
        );
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).send(
        failure({
          message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR,
          errors: err,
        })
      );
    }
  }
}

export default new TestQRController();
