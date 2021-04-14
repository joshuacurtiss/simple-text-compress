function compress(item) {
    const text = typeof item === 'string' ? item : JSON.stringify(item);
    // A. Find all the symbols that can be used because they're not in existing text
    const symbols = [];
    for (let i = 35; i < 452; i += 1) {
        // Only use a safe range of chars
        if (
            i < 127
            || (i >= 161 && i <= 172)
            || i > 173
        ) {
            const c = String.fromCharCode(i);
            if (text.indexOf(c) < 0) symbols.push(c);
        }
    }
    // B. Collect all individual words, count how many times they occur
    const scores = {};
    text.split(/\b/).filter((word) => /\b/.test(word)).forEach((word) => {
        if (scores[word]) scores[word].cnt += 1;
        else scores[word] = { cnt: 1, score: 0 };
    });
    // C. Create words array, filter words occuring once or too short. and sort by best score
    const words = Object.keys(scores).filter((word) => scores[word].cnt > 1 && word.length > 1);
    words.forEach((word) => {
        const info = scores[word];
        info.score = info.cnt * (word.length - 1);
    });
    words.sort((a, b) => scores[b].score - scores[a].score);
    // D. Finally, generate dictionary and do the substitutions
    const dict = {};
    let data = text;
    for (let i = 0; i < symbols.length && i < words.length; i += 1) {
        const c = symbols[i];
        const word = words[i];
        dict[c] = word;
        data = data.replace(new RegExp(`\\b${word}\\b`, 'g'), c);
    }
    // E. Return the compressed data and the dictionary
    return { data, dict };
}

function compressJson(data) {
    const json = JSON.stringify(data);
    return compress(json);
}

module.exports = {
    compress,
    compressJson,
};
