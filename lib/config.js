module.exports = app => {
    // load configuration for configured environment
    // by default if not set, development
    // environment is assumed
    const env = process.env.NODE_ENV;
    if (env) {
        return require(`./config.${env}.js`);
    }
    return require("./config.development.js");
}