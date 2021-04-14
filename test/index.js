/* eslint-disable no-console */
const https = require('https');
const {
    compress,
    compressJson,
    decompress,
    decompressJson,
    flatToObject,
    objectToFlat,
} = require('../src');

// We will use some random Lorem Ipsum text for the test.
const url = 'https://loripsum.net/api/50/long/prude/plaintext';

const toKb = (bytes) => Math.floor(bytes / 102.4) / 10;
const toPct = (a, b) => Math.floor(a * 1000 / b) / 10; // eslint-disable-line no-mixed-operators
const report = (orig, result) => {
    const resultLen = JSON.stringify(result).length;
    console.log(
        'Original size:', toKb(orig.length), 'kb',
        '\nDictionary size:', Object.keys(result.dict).length,
        '\nCompressed size:', toKb(result.data.length), 'kb', `(${toPct(result.data.length, orig.length)}%)`,
        '\nFull packet size:', toKb(resultLen), 'kb', `(${toPct(resultLen, orig.length)}%)`, '(includes dictionary and JSON encoding)',
    );
};
const test = (body) => {
    // Test compressing a standard blob of text
    console.log('\u001b[1;31mTest Plain Text', '\u001b[0m');
    let result = compress(body);
    let decompResult = decompress(result.data, result.dict);
    report(body, result);
    console.log('Decompress:', decompResult === body ? 'Success!' : 'Failed.');
    // Test flattening
    const flattened = objectToFlat(result);
    const obj = flatToObject(flattened);
    const resultString = JSON.stringify(result);
    const objString = JSON.stringify(obj);
    console.log('\u001b[1;31mFlatten Test', '\u001b[0m');
    console.log(
        'Object Size:', toKb(resultString.length), 'kb',
        '\nFlattened Size:', toKb(flattened.length), 'kb', `(${toPct(flattened.length, body.length)}%)`,
        '\nMatch:', objString === resultString ? 'Success!' : 'Failed.',
    );
    // Test compressing JSON
    console.log('\u001b[1;31mTest JSON object', '\u001b[0m');
    const data = body.split('\n').map((text, index) => ({
        index,
        text,
        length: text.length,
        first: text.split(/\b/)[0],
    })).filter((item) => item.length);
    result = compressJson(data);
    decompResult = decompressJson(result.data, result.dict);
    const dataString = JSON.stringify(data);
    const decompResultString = JSON.stringify(decompResult);
    report(dataString, result);
    console.log('Decompress:', decompResultString === dataString ? 'Success!' : 'Failed.');
};

https.get(url, (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (data) => {
        body += data;
    });
    res.on('end', () => {
        test(body);
    });
});
