export default interface ISport {
    _id?: string,
    name: string,
    description: string,
    new: boolean;
    challenges?: number
    image_url: string;
}