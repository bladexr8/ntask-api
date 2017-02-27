// Singleton connection to database
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
//const config = require("./lib/config.js");

let db = null;

module.exports = app => {
    console.log("[INFO] Checking SQL Connection...");
    if (!db) {
        console.log("[INFO] Initializing SQL Connection...");
        // get database settings
        const config = app.lib.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            Sequelize,
            models: {}
        };
        const dir = path.join(__dirname, "models");
        // return array of strings referring to file names in models directory
        // then import and load all models via sequelize.import function
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });
        // execute db.models[key].associate function to 
        // establish model relationships
        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        });
    }
    return db;
};

