
const { count, aggregateData, findOne } = require('../dao/queries');
const { Admins } = require('../models');

let getAdminFunc = async (criteria, projection) => {
    return findOne(Admins, criteria, {}, {lean: true});
}

let  getDashboardCount = async (model, criteria) =>{
    let countData = await count(model, criteria)
    return countData
}

let getDashboardChange = async (model, criteria) =>{
    let currentTimestamp = new Date(Date.now())
    let pipeline = [{$facet: {
        tomorrowCount: [{$match: {"createdAt":{ "$gte": new Date(`${currentTimestamp.getFullYear()}-${currentTimestamp.getMonth()+1}-${currentTimestamp.getDate()-1}`), "$lt": new Date(`${currentTimestamp.getFullYear()}-${currentTimestamp.getMonth()+1}-${currentTimestamp.getDate()}`)}}},
        {
          $count: "count"
        }],
        todayCount: [{$match: {"createdAt":{ "$gte": new Date(`${currentTimestamp.getFullYear()}-${currentTimestamp.getMonth()+1}-${currentTimestamp.getDate()}`)}}},
        {
          $count: "count"
        }],
        }}]
        // console.log(JSON.stringify(pipeline))
        let aggregateD = await aggregateData(model, pipeline)
        // console.log(JSON.stringify(aggregateD))

        if(!aggregateD[0].tomorrowCount.length && !aggregateD[0].todayCount.length){
            return 0
        }else if(!aggregateD[0].tomorrowCount.length && aggregateD[0].todayCount.length){
            return 100
        }else if(aggregateD[0].tomorrowCount.length && !aggregateD[0].todayCount.length){
            return 0
        }else{
            return Math.round(((aggregateD[0].todayCount[0].count/aggregateD[0].tomorrowCount[0].count)-1)*100)
        }
}

module.exports ={
    getAdminFunc,
    getDashboardCount,
    getDashboardChange
}