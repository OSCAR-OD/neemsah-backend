import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {failure, success} from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
import {IFile} from "@shared/types";
import MediaService from "@services/MediaService";
import {IMedia} from "@models/Media";
import {paginate} from "@util/paginate";
import {fileTypes} from "@shared/functions";
//To upload file to aws s3 bucket bellow code will be used
// import {initBucket, uploadToS3} from "@util/s3-uploader";
const {OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY} = StatusCodes;

class MediaController {
    async upload(req: Request, res: Response) {
        try {
        //Check if file exist in request if not then send failure message
        if (!req.files || !req.files.length) {
            return res
                .status(BAD_REQUEST)
                .send(failure({message: BAD_REQUEST, errors: {msg: ErrorMessage.HTTP_BAD_REQUEST}}));
        }
        //If multiple file were uploaded put all names on one array
        const fileInfos: IMedia[] = [];
        const files = req.files as IFile[];
        files.map((file) => {
            const fileInfo: IMedia = {
                path: file.filename,
                caption: req.body.caption,
                description: req.body.description,
                customID: file.filename.split('-')[0],
                type: fileTypes(file.filename)
            }
            fileInfos.push(fileInfo);
        });
        //Save the file info to local database
        if (fileInfos.length > 0) {
            const medias = await MediaService.bulkInsert(fileInfos);
            return res
                .status(OK)
                .send(success(ErrorMessage.HTTP_OK, fileInfos));
        } else {
            return res
                .status(BAD_REQUEST)
                .send(failure({message: ErrorMessage.HTTP_UNSUPPORTED_MEDIA_TYPE, errors: {}}));
        }
        } catch (err) {
          return res
            .status(INTERNAL_SERVER_ERROR)
            .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }

    async all(req: Request, res: Response){
        try {
            let data : any = await MediaService.all();
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

    async single(req: Request, res: Response){
        try {
            const {customID} = req.params;
            const data : IMedia = await MediaService.singleByField({customID});
            if(!data) {
                return res
                    .status(OK)
                    .send(failure({message: ErrorMessage.HTTP_NO_CONTENT, errors: {}}));
            }
            if(data) {
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, data));
            }
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }
    async edit(req: Request, res: Response){
        try {
            const {customID} = req.params;
            const fileInfo: any = {
                caption: req.body.caption,
                description: req.body.description
            }
            const files = req.files as IFile[];
            if(files.length){
                const file = files[0];
                fileInfo.path = customID+'-'+file.filename.split('-')[1];
            }
            const updated = await MediaService.update({customID},fileInfo);
            if (updated) {
                const data = await MediaService.singleByField({customID});
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
                .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }
    async delete(req: Request, res: Response){
        try {
            const {customID} = req.params;
            const deleted = await MediaService.destroy({customID});
            if (deleted)
                return res
                    .status(OK)
                    .send(success(ErrorMessage.HTTP_OK, req.body));
            else
                return res
                    .status(UNPROCESSABLE_ENTITY)
                    .send(failure({message: ErrorMessage.HTTP_UNPROCESSABLE_ENTITY,errors: {}}));
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }
}

export default new MediaController();