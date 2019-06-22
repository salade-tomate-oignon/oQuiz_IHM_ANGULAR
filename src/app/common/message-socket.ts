export class MessageSocket {
    constructor(
        public topic: string,
        public token: string,
        public from: number,
        public to: number,
        public data: any) { }
}
