// npm modules
const async    = require('async');
const path     = require('path');
const fsExtra  = require('fs-extra');
const fs       = require('fs');
const thumbler = require('thumbler');
const aws      = require('aws-sdk');

// Configs
// const StorageConfig = require('../config').storageConf;

// constants imported
// const CONSTANTS = require('../config/constants');
// const APP_CONSTANTS = CONSTANTS.appDefaults;
// const VALIDATION_MESSAGES = CONSTANTS.responseMessages;

// local modules
const	UniversalFunctions =  require('../utils/universal-functions');


aws.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const s3 = new aws.S3();

function saveFileWithStream(fileData, path, callback) {
	try {

		let file = fs.createWriteStream(path);

		file.on('error', function (err) {
			return callback(err);
		});

		fileData.pipe(file);

		fileData.on('end', function (err) {
			if (err) {return callback(err);}
			else {callback(null);}
		});
	} catch (e) {
		return callback(e);
	}
}

function deleteFile(path) {
	fsExtra.remove(path, function (err) {
		console.log('error deleting file>>',err);
	});
}

/*
 Create thumbnail image using graphics magick
 */

function createThumbnailImage(originalPath, thumbnailPath, callback) {
	let gm = require('gm').subClass({imageMagick: true});
	gm(originalPath)
		.define()
		.resize(200, 200, "!")
		.autoOrient()
		.write(thumbnailPath, function (err, data) {
			callback(null);
		});

}


// Create video thumbnail

function createVideoThumb(originalPath,thumbnailPath,callback) {
	thumbler({
		type: 'video',
		input: originalPath,
		output:thumbnailPath,
		time: '00:00:02',
		size: '300x200' // this optional if null will use the desimention of the video
	}, function(err){
		callback(err);
	});

}


//    ***********************************************  NEW  FILE UPLOAD CODE WITH STREAM ***************************************************



function uploadMultipartToS3Bucket(fileInfo, uploadCb) {
	let options={
		Bucket: StorageConfig.AWS_S3.bucket,
		Key: fileInfo.folder+ '/' +fileInfo.fileName,
		ACL:'public-read' ,
		ContentType: fileInfo.mimeType,
		ServerSideEncryption:'AES256'
	};

	s3.createMultipartUpload(options, (mpErr, multipart) => {
		if(!mpErr){
			//console.log("multipart created", multipart.UploadId);
			fs.readFile(fileInfo.path+fileInfo.fileName, (err, fileData) => {

				let partSize = 5242880;
				let parts = Math.ceil(fileData.length / partSize);

				async.times(parts, (partNum, next) => {

					let rangeStart = partNum*partSize;
					let end = Math.min(rangeStart + partSize, fileData.length);

					console.log("uploading ", fileInfo.fileName, " % ", (partNum/parts).toFixed(2));

					partNum++;
					async.retry((retryCb) => {
						s3.uploadPart({
							Body: fileData.slice(rangeStart, end),
							Bucket: StorageConfig.AWS_S3.bucket,
							Key: fileInfo.folder+ '/' +fileInfo.fileName,
							PartNumber: partNum,
							UploadId: multipart.UploadId
						}, (err, mData) => {
							retryCb(err, mData);
						});
					}, (err, data)  => {
						console.log(data);
						next(err, {ETag: data.ETag, PartNumber: partNum});
					});

				}, (err, dataPacks) => {
					s3.completeMultipartUpload({
						Bucket: StorageConfig.AWS_S3.bucket,
						Key: fileInfo.folder+ '/' +fileInfo.fileName,
						MultipartUpload: {
							Parts: dataPacks
						},
						UploadId: multipart.UploadId
					}, uploadCb);
				});
			});
		}else{
			uploadCb(mpErr);
		}
	});
}

function checkForMulitPartUpload(fileObj,isThumb,uploadCb) {
	let fileInfo={
		fileName  : isThumb ? fileObj.thumbName : fileObj.name,
		path      : isThumb ? fileObj.path+'thumb/':fileObj.path,
		folder    : isThumb ? fileObj.s3FolderThumb : fileObj.s3Folder,
		mimeType  : isThumb ? fileObj.thumbMimeType : fileObj.mimeType
	};

	let stats   =  fs.statSync(fileInfo.path+fileInfo.fileName);

	let fileSizeInBytes =stats["size"];
	if(fileSizeInBytes < 5242880) {
		async.retry((retryCb) => {
			fs.readFile(fileInfo.path+fileInfo.fileName, (err, fileData) => {
				s3.putObject({
					Bucket: StorageConfig.AWS_S3.bucket,
					Key:fileInfo.folder+ '/' +fileInfo.fileName ,
					Body: fileData,
					ContentType: fileInfo.mimeType
				}, retryCb);
			});
		}, uploadCb);
	}else{
		uploadMultipartToS3Bucket(fileInfo, uploadCb);
	}
}

function settingParrallelUpload(fileObj, withThumb, callbackParent) {
	async.parallel([
		(callback)=> {
			checkForMulitPartUpload(fileObj, false, function(err){
				callback(err);
				console.log(fileObj.s3Folder+'/'+fileObj.name);
				deleteFile(path.resolve('.')+'/uploads/'+fileObj.s3Folder+'/'+fileObj.name);
			});
		},
		(callback)=> {
			if (withThumb) {checkForMulitPartUpload(fileObj, true, function(err){
				callback(err);
				deleteFile(path.resolve('.')+'/uploads/'+fileObj.s3FolderThumb+'/'+fileObj.thumbName);
			});}
			else {callback(null);}
		}
	], (error)=> {
		if (error) {return callbackParent(error);}
		else {return callbackParent(null);}
	});

}

function checkForThumbnail(otherConstants, fileDetails, firstPart, callbackParent){
	let filename = fileDetails.name,
		TEMP_FOLDER = otherConstants.TEMP_FOLDER,
		s3Folder = otherConstants.s3Folder,
		file = fileDetails.file,
		mimeType = file.hapi.headers['content-type'],
		imageFile=false,
		thumbFileName=fileDetails.thumbFileName,
		videoFile=false;

	if(firstPart==='video')
	{videoFile=true;}
	if(firstPart==='image')
	{imageFile=true;}

	async.waterfall([
		(callback)=> {
			saveFileWithStream(file, TEMP_FOLDER + filename, callback);
		},
		(callback)=>{
			if(videoFile) {
				const getVideoInfo = require('get-video-info');
				getVideoInfo(TEMP_FOLDER + filename).then(info => {
					if (info.format.duration < 3) {
						// callback(VALIDATION_MESSAGES.STATUS_MSG.ERROR.FILE_UPLOAD.VIDEO_DURATION_ERROR);
					} else {
						callback();
					}
				});
			}else{
				callback();
			}
		},
		(callback)=> {
			if (imageFile) {createThumbnailImage(TEMP_FOLDER+filename, TEMP_FOLDER + 'thumb/' + "Thumb_" + thumbFileName, callback);}
			else if(videoFile) {
				createVideoThumb(TEMP_FOLDER+filename, TEMP_FOLDER + 'thumb/' + "Thumb_" + thumbFileName,callback);
			}
			else {callback(null);}
		},
		(callback)=> {
			console.log('thumb',thumbFileName);
			let fileObj = {
				path: TEMP_FOLDER,
				name: filename,
				thumbName: "Thumb_" + thumbFileName,
				mimeType: mimeType,
				thumbMimeType:firstPart==='video' ? 'image/jpeg' :file.hapi.headers['content-type'],
				s3Folder: s3Folder
			};
			if(videoFile || imageFile) {fileObj.s3FolderThumb = otherConstants.s3FolderThumb;}
			settingParrallelUpload(fileObj, (videoFile || imageFile), callback);
		}
	], (error)=> {
		if (error) {callbackParent(error);}
		else {callbackParent(null);}
	});
}

function uploadToS3Bucket(profilePicture,folder) {

	return new Promise((resolve,reject) =>{
		console.log("filename in the function--",profilePicture.hapi.filename);
		let createThumb=false,
			firstPart=profilePicture.hapi.headers['content-type'].split("/")[0],
			baseFolder = folder + '/',
			baseURL = StorageConfig.AWS_S3.s3URL + '/' + baseFolder,
			urls = {};

		async.waterfall([
			(callback)=> {
				let profileFolder = StorageConfig.AWS_S3.folder.profilePicture,
					profilePictureName =UniversalFunctions.generateFilenameWithExtension(profilePicture.hapi.filename,"Main_"),
					s3Folder = baseFolder + profileFolder,
					s3FolderThumb = baseFolder + profileFolder + '/' + StorageConfig.AWS_S3.folder.thumb,
					profileFolderUploadPath = folder + "/profilePicture",
					filePath = path.resolve("") + "/uploads/" + profileFolderUploadPath + "/";

				let fileDetails = {
					file: profilePicture,
					name: profilePictureName,
					thumbFileName:profilePictureName
				};

				let otherConstants = {
					TEMP_FOLDER: filePath,
					s3Folder: s3Folder,
					s3FolderThumb: s3FolderThumb
				};

				if(firstPart==='video')
				{fileDetails.thumbFileName=fileDetails.thumbFileName.substr(0,fileDetails.thumbFileName.lastIndexOf('.'))+'.jpg';}

				urls.original = baseURL + profileFolder + '/' + fileDetails.name;
				urls.thumbnail="";
				if(firstPart==='image' || firstPart==='video')
				{urls.thumbnail = baseURL + profileFolder + '/thumb/Thumb_' + fileDetails.thumbFileName;}

				checkForThumbnail(otherConstants, fileDetails, firstPart, callback);

			}
		], (error)=> {
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%',error);
			if (error) {return reject(error);}
			urls.type=firstPart==='image' ? 'IMAGE' :(firstPart==='video' ? 'VIDEO' : 'OTHER_FILE');
			return resolve(urls);
		});
	});

}






module.exports = {
	uploadToS3Bucket:uploadToS3Bucket
};
