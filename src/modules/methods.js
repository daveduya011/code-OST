export const trimAll = (text) => {
    return text.replace(/\s+/g,' ')
        .replace(/^\s+|\s+$/,'');
}