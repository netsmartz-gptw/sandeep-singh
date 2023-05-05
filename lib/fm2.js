// npm modules
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
// const sharp = require("sharp");
const aws = require("aws-sdk");
const gm = require('gm').subClass({ imageMagick: true })
var mime = require('mime-types')
// const	UniversalFunctions =  require('../utils/universal-functions');
var Axios = require("axios");
var pdfToImg = require("pdf-img-convert");
const fetch = require("fetch").fetchUrl;
const {AWS: {S3: {BUCKET_NAME}}} = require('../constants/appDefaults')

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

let uploadToS3Bucket = async (fileData, folderOf) => {
  const fileName = `${new Date().getDate()}${fileData.hapi.filename}`;
  const mimeType = fileData.hapi.headers["content-type"];
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folderOf}/${fileName}`,
    Body: fileData._data,
    ContentType: mimeType,
    ACL: "public-read",
  };

  let res = await new Promise((resolve, reject) => {
    s3.upload(params, (err, data) =>
      err === null ? resolve(data) : reject(err)
    );
  });

  return { fileUrl: res.Location };
};


let uploadToS3BucketServerUploadedFile = async (filePath, folderOf) => {
  // const fileName = `${new Date().getDate()}${fileData.hapi.filename}`;
  const mimeType = mime.contentType(path.extname(filePath));

  let res = await new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, fileData) => {
      s3.upload({
        Bucket: BUCKET_NAME,
        // Key: `${folderOf}/${fileName}`,
        Key: `${folderOf}/${Date.now()}.png`,
        Body: fileData,
        ContentType: mimeType,
        ACL: "public-read",
      }, (err, data) => {
        err === null ? resolve(data) : reject(err)
      }
      );
    })
  });

  return { fileUrl: res.Location };
};

// const uploadImageToS3 = async function (base64FileCode, filename, folderOf) {
//   let parts = base64FileCode.split(";");
//   let mimType = parts[0].split(":")[1];
//   let imageData = parts[1].split(",")[1];

//   var img = new Buffer(imageData, "base64");
//   return new Promise((resolve, reject) => {
//     sharp(img)
//       // .resize(1800 , 975)
//       .toBuffer()
//       .then(async (resizedImageBuffer) => {
//         let resizedImageData = resizedImageBuffer.toString("base64");
//         let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
//         var docBuffer = decodeBase64Image(resizedBase64);
//         if (docBuffer.error == "Invalid image") {
//           console.log("Invalid Image");
//         } else {
//           var imageType = docBuffer.type;
//           var typeArr = new Array();
//           typeArr = imageType.split("/");
//           var fileExt = typeArr[1];
//           console.log("+++++", docBuffer);

//           var params = {
//             Body: docBuffer.data,
//             Bucket: BUCKET_NAME,
//             Key: `${folderOf}/${filename}.${fileExt}`,
//             ACL: "public-read",
//             ContentType: mimType,
//           };

//           let imageUrlData = await s3.putObject(params).promise();

//           if (imageUrlData) {
//             resolve({
//               imageUrl: `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${filename}.${fileExt}`,
//             });
//           }
//         }
//       })
//       .catch((error) => {
//         // error handeling
//         console.log(error, "error here");
//         reject(error);
//       });
//   });
// };


const uploadImageToS3 = async (base64FileCode, folderOf) => {
  let parts = base64FileCode.split(";");
  let mimType = parts[0].split(":")[1];
  let imageData = parts[1].split(",")[1];
  let buf = Buffer.from(imageData, 'base64')
  let fileName = Date.now()
  let fileExt = mimType.split("/")[1]
  var data = {
    Key: `${folderOf}/${fileName}.${fileExt}`,
    Bucket: BUCKET_NAME,
    ACL: "public-read",
    Body: buf,
    ContentType: mimType
  };
  return new Promise((resolve, reject) => {
    s3.putObject(data, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Error uploading data: ');
        reject(err)
      } else {
        console.log('successfully uploaded the image!', `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${fileName}.${fileExt}`);
        resolve({
          imageUrl: `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${fileName}.${fileExt}`,
        })
      }
    });
  })
}

const uploadDocsToS3 = async (base64FileCode, folderOf) => {
  let parts = base64FileCode.split(";");
  let mimType = parts[0].split(":")[1];
  let imageData = parts[1].split(",")[1];
  let buf = Buffer.from(imageData, 'base64')
  let fileName = Date.now()
  let fileExt = mimType.split("/")[1]
  var data = {
    Key: `${folderOf}/${fileName}.${fileExt}`,
    Bucket: BUCKET_NAME,
    ACL: "public-read",
    Body: buf,
    ContentType: mimType
  };
  return new Promise((resolve, reject) => {
    s3.putObject(data, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Error uploading data: ');
        reject(err)
      } else {
        console.log('successfully uploaded the image!', `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${fileName}.${fileExt}`);
        resolve({
          docUrl: `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${fileName}.${fileExt}`,
        })
      }
    });
  })
}


const uploadDocsToS3WithBufferData = async (bufferObject, folderOf) => {
  // console.log(bufferObject)
  let fileName = Date.now()
  if(bufferObject.fileName) fileName = bufferObject.fileName
  var data = {
    Key: `${folderOf}/${fileName}.${bufferObject.mediaType}`,
    Bucket: BUCKET_NAME,
    ACL: "public-read",
    Body: bufferObject.bufferData,
    ContentType: bufferObject.contentType
  };
  return new Promise((resolve, reject) => {
    s3.putObject(data, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Error uploading data: ');
        reject(err)
      } else {
        console.log('successfully uploaded the image!', `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${fileName}.${bufferObject.mediaType}`);
        resolve({
          docUrl: `https://resureprojectbucket.s3.us-east-2.amazonaws.com/${folderOf}/${fileName}.${bufferObject.mediaType}`,
        })
      }
    });
  })
}

/* function to decode base64 image*/
const decodeBase64Image = function (dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let response = {};
  if (matches) {
    if (matches.length !== 3) {
      return new Error("Invalid input string");
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], "base64");
  } else {
    response.error = "Invalid image";
  }
  //console.log(response.type);
  return response;
};

const removeImagefromS3 = async function (filename) {
  var uploadLocation = "public/uploads/" + filename;
  await fs.unlink(uploadLocation, (err) => {
    console.log("err", err);
  });

  //Delete a file from Space
  var params = {
    Bucket: BUCKET_NAME,
    Key: "public/uploads/" + filename,
  };

  s3.deleteObject(params, function (err, data) {
    if (!err) {
      console.log(data, "Image Deleted Successfully."); // sucessfull response
    } else {
      console.log(err, "Error in Deleting Image."); // an error ocurred
    }
  });
};


function saveFileWithStream(fileData, path) {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(path);

    file.on('error', function (err) {
      return reject(err);
    });

    fileData.pipe(file);

    fileData.on('end', function (err) {
      if (err) { return reject(err); }
      else resolve()
    });
  })
}

function saveFileWithBase64(base64DocsData, path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, base64DocsData, { encoding: 'base64' }, function (err) {
      console.log('File created');
      if (err) reject(err);
      else resolve()
    });
  })
}

let createThumbnail = async (path) => {
  let filename = Date.now()
  let storeAsImage = await pdfToImg.convert(path)

  return new Promise((resolve, reject) => {

    fs.writeFile(`uploads/${filename}.png`, storeAsImage[0], function (error) {
      if (error) { console.error("Error: " + error); }
      // });
      resolve(`uploads/${filename}.png`);

    });
    // storeAsImage(1).then((result) => {
    //   console.log("Page 1 is now converted as image", result);

    //   return resolve(result);
    // })
    // gm(`${path}[0]`)
    //   .thumb(
    //     400, // Width
    //     400, // Height
    //     `uploads/${filename}.png`, // Output file name
    //     80, // Quality from 0 to 100
    //     function (error, stdout, stderr, command) {
    //       // console.log(error, command)
    //       if (!error) {
    //         resolve(`uploads/${filename}.png`);
    //       } else {
    //         reject(error);
    //       }
    //     }
    //   );
  })
}

function deleteFile(path) {
  fsExtra.remove(path, function (err) {
    console.log('error deleting file>>', err);
  });
}

let thumbnailGenerator = async (fileData, folderOf) => {
  await saveFileWithStream(fileData, "uploads/file.pdf");
  let thumbnail = await createThumbnail("uploads/file.pdf");
  let thumbnailData = await uploadToS3BucketServerUploadedFile(
    thumbnail,
    folderOf
  );
  await Promise.all([deleteFile(thumbnail), deleteFile("uploads/file.pdf")]);
  return thumbnailData;
};

let thumbnailGeneratorWithBase64 = async (fileData, folderOf) => {
  let parts = fileData.split(";");
  // let mimType = parts[0].split(":")[1];
  let imageData = parts[1].split(",")[1];
  await saveFileWithBase64(imageData, "uploads/docFile.pdf");
  let thumbnail = await createThumbnail("uploads/docFile.pdf");
  let thumbnailData = await uploadToS3BucketServerUploadedFile(
    thumbnail,
    folderOf
  );
  await Promise.all([deleteFile(thumbnail), deleteFile("uploads/docFile.pdf")]);
  return thumbnailData;
};


let urlFetch = async (url) => {
  return new Promise((resolve, rejects) => {
    fetch(url, function (error, meta, body) {
      if (error) {
        rejects(error);
      } else {
        resolve(body.toString());
      }
    });
  });
};


let convertPDFToHTML = async (pdfUrl, pdfcoKey) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "post",
      url: "https://api.pdf.co/v1/pdf/convert/to/html",
      headers: { "x-api-key": 'sihyung@new-decade.com_6df2d00e82746ab7', "Content-Type": "application/json" },
      // headers: { "x-api-key": 'sandeepworkmail5@gmail.com_7b3fa9f6e87a364fbe05a506366da28caa14', "Content-Type": "application/json" },
      // headers: { "x-api-key": pdfcoKey, "Content-Type": "application/json" },
      data: {
        url: pdfUrl,
        inline: false,
      },
    })
      .then((res) => {
        // console.log(res.data);
        resolve(res.data);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
};


let convertHTMLToPDFFunc = async (HTMLData, pdfcoKey) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "post",
      url: "https://api.pdf.co/v1/pdf/convert/from/html",
      headers: { "x-api-key": pdfcoKey, "Content-Type": "application/json" },
      data: {
        "html": HTMLData,
        "name": "result.pdf",
        "margins": "5px 5px 5px 5px",
        "paperSize": "Letter",
        "orientation": "Portrait",
        "printBackground": true,
        "header": "",
        "footer": "",
        "async": false,
        "encrypt": false
      },
    })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

module.exports = {
  // uploadImageToS3, //not in use
  removeImagefromS3,
  uploadToS3Bucket,
  saveFileWithStream,
  uploadToS3BucketServerUploadedFile,
  deleteFile,
  createThumbnail,
  thumbnailGenerator,
  urlFetch,
  convertPDFToHTML,
  convertHTMLToPDFFunc,
  thumbnailGeneratorWithBase64,
  uploadDocsToS3,
  uploadDocsToS3WithBufferData
};
