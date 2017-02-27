// base express
import express from "express";
// dependency injection management
import consign from "consign";

const app = express();

// dependency injection
// manage models from "models" folder
// and routes from "routes" folder with consign module
consign({verbose: false})
    .include("lib/config.js")
    .then("db.js")
    .then("auth.js")
    .then("lib/middleware.js")
    .then("routes")
    .then("lib/boot.js")
    .into(app);

module.exports = app;
