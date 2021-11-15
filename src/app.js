const express = require("express");
const crypto = require("crypto");
const logger = require("./logger");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("winston-request-logger").create(logger));

const algorithm = process.env.ALGORITHM || "aes-256-cbc";
const initVector = process.env.INIT_VECTOR || crypto.randomBytes(16);
const securityKey = process.env.SECURITY_KEY || crypto.randomBytes(32);

app.post("/decrypt", (req, res, next) => {
  const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
  let decryptedData = decipher.update(req.body.encryptedData, "hex", "utf8");

  decryptedData += decipher.final("utf8");

  const data = JSON.parse(decryptedData);

  res.json(data);
});

app.post("/encrypt", (req, res, next) => {
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
  const message = JSON.stringify(req.body);
  let encryptedData = cipher.update(message, "utf8", "hex");

  encryptedData += cipher.final("hex");

  res.json({
    encryptedData,
  });
});

app.get("/", (req, res, next) => {
  res.send("Crypto API is started.");
});

module.exports = app;
