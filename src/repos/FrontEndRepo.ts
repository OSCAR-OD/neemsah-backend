import Repo from "@repos/Repo";
import Hero, { IHero } from "@models/Hero";
import Gallery, { IGallery } from "@models/Gallery";
import PopUp, { IPopUp } from "@models/PopUp";
import Setting, { ISetting } from "@models/Setting";
import Seo, { ISeo } from "@models/Seo";
import Employee, { IEmployee } from "@models/Employee";
import IndustryCard from "@models/IndustryCard";
import SpecialCard from "@models/SpecialCard";
import ExhibitionCard from "@models/ExhibitionCard";
import ServiceCard from "@models/ServiceCard";
class FrontEndRepo extends Repo {
    constructor() {
        super(Repo);
    }
    public async getAllByPosition(position: string): Promise<IHero[]> {
        return (await Hero.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async getAllEmployeeByPosition(position: string): Promise<IEmployee[]> {
        return (await Employee.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'asc' }));
    }
    public async allIndustryCard(): Promise<any[]> {
        return (await IndustryCard.find().select('-__v').sort({createdAt: 'asc'}));
    }
    public async allSpecialCard(): Promise<any[]> {
        return (await SpecialCard.find().select('-__v').sort({createdAt: 'asc'}));
    }
    public async allExhibitionCard(): Promise<any[]> {
        return (await ExhibitionCard.find().select('-__v').sort({createdAt: 'desc'}));
    }
    public async getAllGallery(): Promise<IGallery[]> {
        return (await Gallery.find().populate('images', ['path', 'id', 'customID', 'type']).select("-_v"));
    }
    public async singleSettingByField(data:any): Promise<ISetting> {
        return (await Setting.findOne(data).populate('headerIcon', ['path', '_id', 'customID', 'type']).populate('favIcon', ['path', '_id', 'customID']).populate('social.icon', ['path', '_id', 'customID']).select("-__v"));
    }
    public async singlePopUpByField(data: any): Promise<IPopUp> {
        return (await PopUp.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
    public async singleSeoByField(data: any): Promise<ISeo> {
        return (await Seo.findOne(data).select("-__v").select('-__v -_id'));
    }
}

export default new FrontEndRepo();