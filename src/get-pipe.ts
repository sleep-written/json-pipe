import { EmptyPipeError, TTYNotAllowedError } from './errors/index.js';

export const getPipe = (encoding?: BufferEncoding) => new Promise<string>((resolve, reject) => {
    if (process.stdin.isTTY) {
        reject(new TTYNotAllowedError());
    }

    const chunks: Buffer[] = [];
    process.stdin.once('error', error => reject(error));
    process.stdin.once('end', () => {
        const result = Buffer
            .concat(chunks)
            .toString(encoding)
            .trim();

        if (result.length === 0) {
            reject(new EmptyPipeError());
        } else {
            resolve(result);
        }
    });

    process.stdin.on('data', chunk => chunks.push(chunk));
});