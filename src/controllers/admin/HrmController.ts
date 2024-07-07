import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
import { success, failure } from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import { IFile, IKey } from "@shared/types";
import HrmService from "@services/HrmService";
import HrmRepo from "@repos/HrmRepo";
import { paginate } from "@util/paginate";
import Validator from 'validatorjs';

class HrmController {
  async registerEmployee(req: Request, res: Response) {
    try {
      const { name, image, designation, email, phone, address, role, accountStatus, password } = req.body;
      //console.log("req.body", req.body);
      let validation = new Validator(req.body, {
        name: 'required',
        image: 'string',
        designation: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        address: 'string',
        role: 'string',
        accountStatus: 'string',
        password: 'required|min:8',
      });
      if (validation.fails()) {
        return res
          .status(BAD_REQUEST)
          .send(failure(
            { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
          ));
      }
      if (await HrmRepo.existByEmail(email)) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .send(failure(
            {
              message: ErrorMessage.HTTP_BAD_REQUEST,
              errors: {
                email: "User already exist with this email address. Please try again with another email address. Thanks."
              }
            }
          ));
      }
      const created = await HrmRepo.add({ name, image, designation, email, phone, address, role, accountStatus, password });
      if (created)
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
        .send(failure(
          { message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err }
        ));
    }
  }
  async allHrmEmployee(req: Request, res: Response) {
    try {
      const { page, size }: any = req.query;
      let data: any = await HrmService.allHrmEmployee();
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
  async deleteHrmEmployee(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const deleted = await HrmService.destroy({ customID });
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
  async singleHrmEmployee(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const data: any = await HrmService.singleByField({ customID });
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
  async editHrmEmployee(req: Request, res: Response) {
    try {
      const { customID } = req.params;
      const { name, image, designation, email, phone, address, role, accountStatus, password } = req.body;
      let validation = new Validator(req.body, {
        name: 'required|string',
        image: 'string',
        designation: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        address: 'string',
        role: 'string',
        accountStatus: 'string',
        password: 'required|min:8',
      });
      if (validation.fails()) {
        return res
          .status(BAD_REQUEST)
          .send(failure(
            { message: ErrorMessage.HTTP_BAD_REQUEST, errors: validation.errors.errors }
          ));
      }

      const updated = await HrmService.update({ customID }, { name, image, designation, email, phone, address, role, accountStatus, password });
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
}
export default new HrmController();