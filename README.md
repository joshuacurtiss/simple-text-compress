# Simple Text Compression

This library handles simple text compression by substituting the most common words with unused characters. 

## Installation and Usage

Add the library to your project: 
```
npm install simple-text-compress
```

Then simply execute the `compress` and `decompress` functions. You could pull them out of the library like this:
```js
const { compress, decompress } = require('simple-text-compress');
```

### Compression

```js
const myBigText = 'Lorem ipsum ... blah blah blah ipsum flipsum.';
const compressed = compress(myBigText);
```

The `compressed` variable will be an object:
  * `data`: The text in its compressed form.
  * `dict`: An object dictionary for all the character/word substitutions.

### Decompression

```js
const decompressed = decompress(compressed.data, compressed.dict);
```

The `decompressed` variable will be the text restored to its original form.
