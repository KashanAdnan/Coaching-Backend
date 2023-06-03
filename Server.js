const express = require("express");
const app = express();
const UserRoute = require("./Routes/User.Route");
const AdmissionRoute = require("./Routes/Admission.Route");
const ContactRoute = require("./Routes/Contact.Route");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { connectDatabase } = require("./DataBase/Connection.DB");
const ErrorMiddleware = require("./Middleware/Error");
const cookieParser = require("cookie-parser");
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`.red);
  console.log(`Shutting down the server due to Unhandled Promise Exeption`.red);
});
app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd"))));
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
connectDatabase(
  "mongodb+srv://kashan:kashan654321@cluster0.c6v8zv7.mongodb.net/?retryWrites=true&w=majority"
)
  .then((result) => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log("MongoDB Disconnected !");
  });
app.use("/api/v1", UserRoute);
app.use("/api/v2", AdmissionRoute);
app.use("/api/v3", ContactRoute);

app.use(ErrorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Running`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
