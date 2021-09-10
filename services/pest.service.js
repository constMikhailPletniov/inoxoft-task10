const path = require('path');
const fs = require('fs');
const util = require('util');

const readPromise = util.promisify(fs.readFile);
const appendPromise = util.promisify(fs.writeFile);
const pestPath = path.join('database', 'pestsData.json');

const getPests = async () => {
    const getPest = await readPromise(pestPath);
    return JSON.parse(getPest);
};
const addPest = async (data) => {
    const pests = await getPests();
    pests.push(data);
    await appendPromise(pestPath, JSON.stringify(pests));
};
const getName = async (name) => {
    const pests = await getPests();
    const findName = await pests.find((pest) => pest.name === name);
    return findName;
}

module.exports = {
    addPest,
    getName,
    getPests
}
