import Repo from "@repos/Repo";
import Setting, { ISetting } from "@models/Setting";

class SettingRepo extends Repo {
    constructor() {
        super(Setting);
    }
    public async all(): Promise<ISetting[]> {
        return (await Setting.find().populate('headerIcon', ['path', '_id', 'customID',"type"]).populate('favIcon', ['path', '_id', 'customID','type']).populate('social.icon', ['path', '_id', 'customID','type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data:any): Promise<ISetting> {
        return (await Setting.findOne(data).populate('headerIcon', ['path', '_id', 'customID',"type"]).populate('favIcon', ['path', '_id', 'customID','type']).populate('social.icon', ['path', '_id', 'customID','type']).select("-__v"));
    }
}

export default new SettingRepo();