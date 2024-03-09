const shortid = require("shortid");
const URL = require('../model/model');

const GenerateNewShortUrl = async(req,res) =>{
    const body = req.body;
    if(!body.url) return res.status(400).json({status : "URL is required"});
    const shortID = shortid();

    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : [], 
    });

    return res.json({id: shortID});
}

const GetAnalytics = async(req,res) => {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });

}
module.exports = {
    GenerateNewShortUrl,
    GetAnalytics,
}