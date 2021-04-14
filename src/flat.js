const LF = '\n';

function objectToFlat({ data, dict }) {
    let out = '';
    Object.entries(dict).forEach(([key, val]) => {
        out += key + val + LF;
    });
    return out + LF + data;
}

function flatToObject(flat) {
    const out = { data: '', dict: {} };
    const parts = flat.split(LF);
    const marker = parts.indexOf('');
    parts.forEach((part, idx) => {
        if (idx >= marker) return;
        const first = part.substr(0, 1);
        const val = part.substr(1);
        out.dict[first] = val;
    });
    out.data = parts.slice(marker + 1).join(LF);
    return out;
}

module.exports = {
    objectToFlat,
    flatToObject,
};
