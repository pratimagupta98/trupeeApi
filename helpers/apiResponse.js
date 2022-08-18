const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

exports.alreadyr = function (res) {
    var data = {
      status: false,
      message: "already exists",
    };
    return res.status(403).json(data);
  };
  
  exports.successr = function (res, data) {
    var resData = {
      status: true,
      message: "success",
      count: data.length,
      data: data,
    };
    return res.status(200).json(resData);
  };
  
  exports.errorr = function (res, error) {
    var data = {
      status: false,
      message: "error",
      error: error,
    };
    return res.status(400).json(data);
  };
  
  exports.deleter = function (res, data) {
    var data = {
      status: true,
      message: "deleted",
      deleteCount: data.deletedCount,
    };
    return res.status(200).json(data);
  };
  
  exports.validationErrorWithData = function (res, msg, data) {
    var resData = {
      status: false,
      message: msg,
      data: data,
    };
    return res.status(400).json(resData);
  };
  
  exports.unauthorizedResponse = function (res, msg) {
    var data = {
      status: false,
      message: msg,
    };
    return res.status(401).json(data);
  };
  





  exports.uploadBase64ImageFile = (base64Data,fileName,type) => {
    try{
        // Read content from the file
    
    // Setting up S3 upload parameters
    const params = {
      //  Bucket: 'experteducation',
        Key: `${fileName}.${type}`, // File name you want to save as in S3
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: type,
        //ACL: 'public-read',   
    };
    console.log(params,"%%%%%%%%%%%%");
    // Uploading files to the bucket
    // return new Promise(function(resolve, reject) {
    //     //fileStream.once('error', reject);
    //     cloudinary.uploader.upload(params).promise().then(resolve, reject);
    // });
    }catch(e){
      throw e;  
    }
    
};






 const mime = require('mime');

exports.uploadImage = async (req, res, next) => {
  // to declare some path to store your converted image
  var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
  response = {};
   
  if (matches.length !== 3) {
  return new Error('Invalid input string');
  }
   
  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.extension(type);
  let fileName = "image." + extension;
  try {
  fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
  return res.send({"status":"success"});
  } catch (e) {
  next(e);
  }
  }