import Repo from "@repos/Repo";
import Hero, { IHero } from "@models/Hero";
class HeroRepo extends Repo {
    constructor() {
        super(Hero);
    }
    public async all(): Promise<any[]> {
        return (await Hero.find().select('-__v').sort({ createdAt: 'desc' }));
    }
    public async getAllByPosition(position: string): Promise<IHero[]> {
        return (await Hero.find({ position: position }).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").sort({ createdAt: 'desc' }));
    }
    public async singleByField(data: any): Promise<IHero> {
        return (await Hero.findOne(data).populate('image', ['path', '_id', 'customID', 'type']).select("-__v").select('-__v -_id'));
    }
}

export default new HeroRepo();