export class EmptyPipeError extends Error {
    constructor() {
        super('None data received through stdin');
    }
}