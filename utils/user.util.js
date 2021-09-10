
const userNormalize = (normalize) => {
    const fieldRemove = [
        'password',
        '__v',
        'role'
    ];
    const normalizeObj = normalize.toObject();

    fieldRemove.forEach((field) => delete normalizeObj[field]);
    return normalizeObj;
};

module.exports = {
    userNormalize
}
