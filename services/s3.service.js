const uuid = require('uuid').v1;
const S3 = require('aws-sdk/clients/s3');
const path = require('path');

const { statusEnum } = require('../config');

const bucket = new S3({
    region: statusEnum.AWS_S3_REGION,
    accessKeyId: statusEnum.AWS_S3_ACCESS_KEY,
    secretAccessKey: statusEnum.AWS_S3_SECRET_KEY
});

module.exports = {
    upload: (file, fileType, itemId) => {

        const uploadPath = _fileNameBuild(file, fileType, itemId);

        return bucket.upload({
            Bucket: statusEnum.AWS_S3_NAME,
            Body: file.data,
            Key: uploadPath,
            ContentType: file.mimetype
        }).promise();

    }
}
function _fileNameBuild(file, fileType, itemId) {

    const { name } = file;
    const exNameFile = path.extname(name);

    return path.join(fileType, itemId, `${uuid()}.${exNameFile} `);

}