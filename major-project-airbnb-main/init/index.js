const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  const  initData = initData.data.map((obj) => ({
    ...obj,
    owner: "68a74f39237ce5de558a4efb",
  }));
  await Listing.insertMany(dataWithOwner);
  console.log("data was initialized");
};


initDB(); 


