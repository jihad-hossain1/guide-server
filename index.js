require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db")


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`server is run on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("connect failed!!!", error));



// const express = require("express");
// require("dotenv").config();
// const { graphqlHTTP } = require("express-graphql");
// const schema = require("./schema/schema");
// const connectDB = require("./config/db");
// const cors = require("cors");

// const port = process.env.PORT || 6000;

// const app = express();

// // connect to database
// connectDB();

// //cors policy
// app.use(cors());

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === "development",
//   })
// );

// app.listen(port, console.log(`server runnng on port ${port}`));
