/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {getStringFromDataView, indexOfStringInDataView} from './utils.js';

export default {
    isXmpFile,
    findXmpOffsets
};

const XMP_IDENTIFIER = '<x:xmpmeta xmlns:x="adobe:ns:meta/"';
const XMP_END = '</x:xmpmeta>';

function isXmpFile(dataView) {
    return !!dataView && (getStringFromDataView(dataView, 0, XMP_IDENTIFIER.length) === XMP_IDENTIFIER);
}

function findXmpOffsets(dataView) {
    const endPosition = indexOfStringInDataView(XMP_END, dataView, 0, dataView.byteLength);

    if (endPosition === -1) {
        return {} 
    }
    
    return {
        xmpChunks: [
            {
                dataOffset: 0,
                length: endPosition + XMP_END.length,
            }
        ]
    };
}
