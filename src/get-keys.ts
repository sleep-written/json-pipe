export function getKeys(processInstance?: { argv: string[] }): string[] {
    if (!processInstance) {
        processInstance = process;
    }

    const argv = (processInstance ?? process).argv;
    const keysRegExp = /^(\-{1,1}k|\-{2,2}keys)$/gi;
    const flagLocation = argv.findIndex(x => keysRegExp.test(x));
    return flagLocation >= 0
    ?   argv.slice(flagLocation + 1)
    :   [];
}
