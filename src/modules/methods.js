export const trimAll = (text) => {
    return text.replace(/\s+/g,' ')
        .replace(/^\s+|\s+$/,'');
}


export const retrieveImageFromClipboardAsBlob = (pasteEvent, callback) => {
    if(pasteEvent.clipboardData === false){
        callback(undefined);
        return;
    }

    const items = pasteEvent.clipboardData.items;

    if(items === undefined){
        callback(undefined);
        return;
    }

    for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") === -1) continue;
        // Retrieve image on clipboard as blob
        let blob = items[i].getAsFile();
        callback(blob);
    }
}