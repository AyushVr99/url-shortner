import shortid from 'shortid';
import  URL_Model from '../model/model.js';

export const generateShortURL = async(req,res) => {
    const url = req.body.url;
    if(!url) return res.status(400).json("URL is required");

    const shortId = shortid();

    await URL_Model.create({
        shortId: shortId,
        redirectUrl: url,
        visitHistory: [],
    });
    return res.status(200).json({id: shortId});
}

export const getAnalytics = async(req,res) => {
    const shortId = req.params.shortId;
    const data = await URL_Model.findOne({shortId});
    return res.json({
        totalClicks: data.visitHistory.length,
        analytics: data.visitHistory
    });
}