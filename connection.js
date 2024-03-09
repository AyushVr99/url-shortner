const mongoose = require("mongoose")
mongoose.set("strictQuery", true);
const connectMongoDb = (url) => {
    return mongoose.connect(url);
}
module.exports = {
    connectMongoDb
}