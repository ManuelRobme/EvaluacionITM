
const format = require('util').format;
const { Storage } = require('@google-cloud/storage');
const uuidv4 = require('uuid/v4');
const sharp = require('sharp')

const storage = new Storage({
    projectId: "684956659612",
    keyFilename: "./gcloud.json"
});

const bucket = storage.bucket("plataformaitm.appspot.com");





module.exports.uploadImage = function (req, res, next) {

    console.log("storage")

    let image = req.file;
    if (image) {
        uploadImageToStorage(image).then((success) => {
            req.imageUrl = success
            console.log(success)
            next()
        }).catch((error) => {

            console.log(error)
            next()
        });
    } else {
        next()
    }


}

module.exports.uploadFile = function (req, res, next) {

    console.log("storage")

    let file = req.file;
    if (file) {
        uploadFileToStorage(file).then((success) => {
            req.fileName = file.originalname
            req.fileUrl = success
            console.log(success)
            next()
        }).catch((error) => {

            console.log(error)
            next()
        });
    } else {
        next()
    }


}


module.exports.uploadFiles = async function (req, res, next) {



    let files = req.files;
    if (files && files.length > 0) {

        try {
            for (let i = 0; i < files.length; i++) {
                files[i].fileUrl = await uploadFileToStorage(files[i])
            }
            next()

        } catch (err) {
            console.log(err)
            next()
        }


    } else {
        next()
    }


}

module.exports.isComplete = function (i, total, next) {
    if (i === total) next()
}


const uploadBufferToStorage = (buffer, mimetype) => {
    let prom = new Promise((resolve, reject) => {
        if (!buffer) {
            reject('No image image');
        }


        let imageUpload = bucket.file("/images/" + uuidv4() + ".png");

        const blobStream = imageUpload.createWriteStream({
            metadata: {
                contentType: mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.log(error)
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the image via HTTP.
            imageUpload.makePublic().then(() => {
                const url = format(`https://storage.googleapis.com/${bucket.name}/${imageUpload.name}`);
                resolve(url);
            });

        });


        blobStream.end(buffer);
    });
    return prom;
}


const uploadImageToStorage = (image) => {
    let prom = new Promise((resolve, reject) => {
        if (!image) {
            reject('No image image');
        }


        let imageUpload = bucket.file("/images/" + uuidv4() + ".png");

        const blobStream = imageUpload.createWriteStream({
            metadata: {
                contentType: image.mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.log(error)
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the image via HTTP.
            image.cloudStorageObject = image.originalname;
            imageUpload.makePublic().then(() => {
                const url = format(`https://storage.googleapis.com/${bucket.name}/${imageUpload.name}`);
                resolve(url);
            });

        });


        blobStream.end(image.buffer);
    });
    return prom;
}

const uploadFileToStorage = (file) => {
    let prom = new Promise((resolve, reject) => {
        if (!file) {
            reject('No file');
        }

        let array = file.originalname.split('.')
        let filetype = array[array.length - 1]

        if (!filetype) reject('No filetype')

        let fileUpload = bucket.file("/files/" + uuidv4() + '.' + filetype);

        const blobStream = fileUpload.createWriteStream({
        });

        blobStream.on('error', (error) => {
            console.log(error)
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the image via HTTP.
            file.cloudStorageObject = file.originalname;
            fileUpload.makePublic().then(() => {
                const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
                resolve(url);
            });

        });


        blobStream.end(file.buffer);
    });
    return prom;
}

exports.uploadImageWithThumbnail = async (req, res, next) => {
    console.log("storage")

    let image = req.file;
    if (image) {
        try {
            const thumbnail = await sharp(image.buffer).resize(128).toBuffer()

            const [thumbnailUrl, imageUrl] = await Promise.all([
                uploadBufferToStorage(thumbnail, image.mimetype), uploadBufferToStorage(image.buffer, image.mimetype)
            ])

            
            req.thumbnailUrl = thumbnailUrl
            req.imageUrl = imageUrl
            next()

            /* uploadImageToStorage(image).then((success) => {
                req.imageUrl = success
                console.log(success)
                next()
            }).catch((error) => {

                console.log(error)
                next()
            }); */
        } catch (error) {
            console.log(error)
            next()
        }
    } else {
        next()
    }
}