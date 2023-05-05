'use strict';
const FCM = require('fcm-node')
let fcm = new FCM("AAAAhbQCj9A:APA91bEBd0IOtDKoovtU17ftx9m0wIkOu0gQbCBwQCaFyI88DYovJpO7EqRdTrEW4UIpx2J8BOzfSfAFkkAWT-V2yH0ZEcRceNWrNi0_6y-xQwLH8tAWYPSgvgADWAR0hnzj7at8m2x5");
let sendPushNotificationFunc = async(deviceToken,dataToPush)=>{
    try{
        let message = {
            registration_ids:deviceToken,
            collapse_key: 'demo',
            notification: {
                title:dataToPush.title,
                body: dataToPush.message,
                sound:'default',
                badge:1,
                data:dataToPush
            },
            data:{
                title:dataToPush.title,
                body: dataToPush.msg,
                data:dataToPush,
                sound:'default',
                badge:1,
            },
            priority: 'high'
        };

        fcm.send(message, function(err, result){
            if (err) {
               console.log(err,'===================error=========================');
            } else {
               console.log(result,'===================result=========================');
            }
        });

    }catch(err){
        throw err;
    }
}

module.exports = {
    sendPushNotificationFunc
}