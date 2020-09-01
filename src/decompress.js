module.exports = function decompress(data, dict) {
    let out = data;
    Object.keys(dict).forEach((key) => {
        while (out.indexOf(key) >= 0) out = out.replace(key, dict[key]);
    });
    return out;
};
