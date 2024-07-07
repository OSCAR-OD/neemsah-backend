import Repo from "@repos/Repo";
import Gallery, { IGallery } from "@models/Gallery";

class GalleryRepo extends Repo {
    constructor() {
        super(Gallery);
    }
    public async all(): Promise<IGallery[]> {
        return (await Gallery.find().populate('images', ['path', 'id', 'customID', 'type']).select("-_v"));
    }
    public async singleByField(data: any): Promise<IGallery> {
        return (await Gallery.findOne(data).populate('images', ['path', 'id', 'customID', 'type']).select("-_v"));
    }

}

export default new GalleryRepo();