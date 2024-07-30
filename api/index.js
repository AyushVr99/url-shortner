import  express from "express";
import mongoose  from "mongoose";
import urlRouter from "./router/route.js";
import dotenv from "dotenv";
import  URL_Model from './model/model.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.MONGO)
    .then(()=> console.log("MongoDb Connected"))
    .catch((err)=> console.log(err))


app.use(express.json());

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const data = await URL_Model.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date()
                    }
                }
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).send('URL not found');
        }
        return res.redirect(data.redirectUrl);

    } catch (err) {
        console.error(`Error finding and updating URL: ${err}`);
        return res.status(500).send('Internal Server Error');
    }
});

app.use('/url' , urlRouter);

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
