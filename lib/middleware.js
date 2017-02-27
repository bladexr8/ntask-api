// master middleware settings
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import logger from "./logger.js";
import helmet from "helmet";


module.exports = app => {
    // port for server to listen on
    app.set("port", 3000);
    // format JSON output
    app.set("json spaces", 2);
    // configure logging
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    // use helmet middleware modules for extra HTTP security
    app.use(helmet());
    // configure CORS support
    app.use(cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    // use GZIP compression of responses where supported
    app.use(compression());
    // Middleware for pre-execution of routes
    app.use(bodyParser.json());
    // initiate passport middleware
    logger.info(`[${new Date()}] Initialising Passport Middleware...`);
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    // static directory for APIdocs
    app.use(express.static("public"));
};