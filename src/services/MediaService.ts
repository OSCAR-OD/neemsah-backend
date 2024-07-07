import Service from "@services/Service";
import MediaRepo from "@repos/MediaRepo";
import path from "path";
import fs from "fs";
import envVars from "@shared/env-vars";
class MediaService extends Service {
    constructor() {
        super(MediaRepo);
    }
    public async all() {
        return MediaRepo.all();
    }

    public async update(filter: any, data: any): Promise<any> {
        const persist = await MediaRepo.singleByField(filter);
        if (data.path !== persist.path && data.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.update(filter, data);
    }

    public async destroy(data: any): Promise<any> {
        const persist = await MediaRepo.singleByField(data);
        if (persist.path) {
            const filePath = path.join(__dirname, '../', envVars.folder, persist.path);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        return super.destroy(data);
    }
}

export default new MediaService();