import Repo from "@repos/Repo";
import Media from "@models/Media";

class MediaRepo extends Repo {
    constructor() {
        super(Media);
    }
    public async all(): Promise<any[]> {
     
        return (await Media.find().select('-__v').sort({createdAt: 'desc'}));
    }
}

export default new MediaRepo();