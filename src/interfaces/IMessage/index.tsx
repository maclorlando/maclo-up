export default interface IMessage {
    id: string,
    message: string,
    user: {
        name: string
    },
    date: string;
}