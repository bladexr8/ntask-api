// boot the express server

import https from "https";
import fs from "fs";

module.exports = app => {
    console.log("[INFO] Initializing Database and Booting App...");
    // only run database sync and listen when not in test mode
    if (process.env.NODE_ENV !== "test") {
        const credentials = {
            key: fs.readFileSync("server.key", "utf8"),
            cert: fs.readFileSync("server.crt", "utf8")
        }
        app.db.sequelize.sync().done(() => {
            https.createServer(credentials, app)
            .listen(app.get("port"), () => {
                console.log(`[INFO] NTask API - Port ${app.get("port")}`);
            });
        });
    }
};