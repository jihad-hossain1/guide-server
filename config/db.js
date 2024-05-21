const mongoose = require("mongoose");



const connectDB = async () => {
 try {
   if (process.env.NODE_ENV == "development") {
      const conn = await mongoose.connect("mongodb://127.0.0.1:27017/graphql");
   console.log(`<--------connected on mongodb------->`);
   } else {
   const conn = await mongoose.connect(process.env.MONGODB_URI)
   console.log(`<--------connected on mongodb------->`);
   }
 } catch (error) {
  console.log(error);
 }
 
};

module.exports = connectDB;
