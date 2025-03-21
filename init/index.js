const mongoose = require("mongoose");
const initdata = require("./data");
const images = require("./models/images.js");

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeimages");
}    

const initDB = async () => {
    await images.deleteMany({});
    await images.insertMany(initdata.data);
    console.log("Data stored in DB successfully.");
}    

initDB();
