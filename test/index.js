/* eslint-disable no-console */
const https = require('https');
const { compress, decompress } = require('../src');

// We will use some random Lorem Ipsum text for the test.
const url = 'https://loripsum.net/api/50/long/prude/plaintext';

const toKb = (bytes) => Math.floor(bytes / 102.4) / 10;
const toPct = (a, b) => Math.floor(a * 1000 / b) / 10; // eslint-disable-line no-mixed-operators

https.get(url, (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (data) => {
        body += data;
    });
    res.on('end', () => {
        const result = compress(body);
        const resultLen = JSON.stringify(result).length;
        console.log(
            'Original size:', toKb(body.length), 'kb',
            '\nDictionary size:', Object.keys(result.dict).length,
            '\nCompressed size:', toKb(result.data.length), 'kb', `(${toPct(result.data.length, body.length)}%)`,
            '\nFull packet size:', toKb(resultLen), 'kb', `(${toPct(resultLen, body.length)}%)`, '(includes dictionary and JSON encoding)',
        );
        const decompResult = decompress(result.data, result.dict);
        if (decompResult === body) console.log('Decompresses ok!');
        else console.log('Failed to decompress.');
    });
});
