import logger from "./logger.js";

module.exports = {
    // database info
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: (sql) => {
			console.log("[INFO] Logging SQL - " + sql);
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: true
        }
    },
    // JWT Settings
    // secret key string that serves as a base to encode and decode tokens
    jwtSecret: "Nta$K-AP1",
    // inform Passport that the API won’t manage the session.
    jwtSession: {session: false}
};