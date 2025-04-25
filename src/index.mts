#! /usr/local/bin/node
import { EmptyPipeError, TTYNotAllowedError } from './errors/index.js';
import { getKeys } from './get-keys.js';
import { getPipe } from './get-pipe.js';

try {
    console.log();
    const pipe = await getPipe();

    let json = JSON.parse(pipe);
    const keys = getKeys()
        .map(x => { json = json?.[x]; return `["${x}"]`; })
        .join('');
    
    const title = keys.length > 0
    ?   `Parsed JSON value for json${keys}:`
    :   'Parsed JSON:';

    if (typeof json === 'string') {
        json = JSON.stringify(json);
    }
    
    console.log(title);
    console.log(''.padStart(48, '-'));
    console.log(json);
    console.log();

} catch (err: any) {
    console.log('ERROR:');
    console.log(''.padStart(48, '-'));
    console.log(err?.message);
    console.log();

    if (err instanceof TTYNotAllowedError) {
        process.exit(666);
    } else if (err instanceof EmptyPipeError) {
        process.exit(420);
    } else {
        process.exit(999);
    }
}
