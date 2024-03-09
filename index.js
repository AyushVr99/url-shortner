const express = require("express");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./Router/routes");
const URL = require("./model/model");
const app = express();

const PORT = process.env.PORT || 7002;

connectMongoDb("mongodb://127.0.0.1:27017/shortUrl").then(()=> console.log("MongoDb connected"))

app.use(express.json());
app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate({
        shortId
    }, { $push:{
        visitHistory:{
            timestamps : Date.now()
        }
    }});   

    if (!result) {
        console.log("Entry is null")
        return res.status(404).send('URL not found');
    }
    console.log(result);
    console.log(result.shortId);
    console.log(result.redirectUrl);
    return res.redirect(result.redirectUrl);
});

app.use('/url',urlRoute);


app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));