require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const https = require("https");
const http = require("http");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

const MONGODB = process.env.DATABASE;
const MONGODBstore = new MongoDBStore({
  uri: MONGODB,
  collection: "sessions",
  expires: 1000 * 60 * 60,
});
MONGODBstore.on("error", (error) => {
  console.error(error);
});

const databaseConnect = require("./database/databaseConnect");
databaseConnect();
const Project = require("./database/projectSchema");

const admin = require("./routes/admin");
app.use("/admin", admin);

// const login = require("./routes/login");
// app.use(login);

const email = require("./routes/email");
app.use("/email", email);

const get = require("./routes/get");
app.use("/get", get);

const PORT = process.env.PORT || 8000;

// Only run an HTTPS server if we're not in production, otherwise we're expecting production to provide the HTTPS capabilities
if (process.env.NODE_ENV != "production") {
  const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
  const options = {
    key: fs.readFileSync(`./tls/server.key`),
    cert: fs.readFileSync(`./tls/server.cert`),
  };

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS server is running on port ${HTTPS_PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
