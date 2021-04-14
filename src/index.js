const { compress, compressJson } = require('./compress');
const { decompress, decompressJson } = require('./decompress');
const { flatToObject, objectToFlat } = require('./flat');

module.exports = {
    compress,
    compressJson,
    decompress,
    decompressJson,
    flatToObject,
    objectToFlat,
};
