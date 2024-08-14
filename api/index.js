import  express from "express";
import mongoose  from "mongoose";
import urlRouter from "./router/route.js";
import dotenv from "dotenv";
import  URL_Model from './model/model.js';
// import path from 'path';

dotenv.config(); 

// const __dirname = path.resolve();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;


mongoose
    .connect(process.env.MONGO)
    .then(()=> console.log("MongoDb Connected"))
    .catch((err)=> console.log(err))



app.get('url/ping', () => {
    return res.text("pong");
})
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


// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
