// responsible for generating an encoded token
// will generate an encoded token with a payload
// if the user sends correct credentials in
// req.body.email and req.body.password

// payload will contain user id. The token
// generation occurs via the jwt-simple module
// using jwt.encode(payload, cfg.jwtSecret) which
// must use same secret key jwtSecret created
// in config.js. Any errors will generate a
// 401 Unauthorised return code

import jwt from "jwt-simple";
import logger from "../lib/logger.js";

module.exports = app => {
    const cfg = app.lib.config;
    const Users = app.db.models.Users;

    /**
     * @api {post} /token Authentication Token
     * @apiGroup Credentials
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} Input
     * {
     *  "email": "john@connor.net",
     *  "password": "123456"
     * }
     * @apiSuccess {String} token Token of authenticated user
     * @apiSuccessExample {json} apiSuccess
     *  HTTP/1.1 200 OK
     *  {"token": "xyz.abc.123.hgf"}
     * @apiErrorExample {json} Authentication error
     *  HTTP/1.1 401 Unauthorized
     */

    app.post("/token", (req, res) => {
        if (req.body.email && req.body.password) {
            // extract email and password
            const email = req.body.email;
            const password = req.body.password;
            logger.info(`[${new Date()}][token.js] Getting API Access Token...`);
            // Find user in database
            Users.findOne({where: {email: email}})
              .then(user => {
                  logger.info(`[${new Date()}][token.js] Found User %s ...`, email);
                  // if user found, check password matches
                  if (Users.isPassword(user.password, password)) {
                      logger.info(`[${new Date()}][token.js] User %s Password Matches...`, email);
                      // initialise payload and generate JWT
                      const payload = {id: user.id};
                      // send JWT in response
                      logger.info(`[${new Date()}][token.js] Generating JWT and returning to client...`);
                      res.json({
                          token: jwt.encode(payload, cfg.jwtSecret)
                      });
                  } else {
                      logger.info(`[${new Date()}][token.js] User %s Password DOES NOT MATCH...`, email);
                      res.sendStatus(401);
                  }
              })
              .catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        }
    });
};