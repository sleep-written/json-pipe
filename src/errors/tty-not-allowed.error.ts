export class TTYNotAllowedError extends Error {
    constructor() {
        super(`TTY mode isn't allowed for this application`);
    }
}