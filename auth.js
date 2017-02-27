// rules on how users will be authenticated in API

// middleware will be executed when it starts the application, and receives
// in it's callback a payload that contains a decoded JSON that has been
// decoded using the secret key defined in cfg.jwtSecret

// this payload will have the attribute id that will be a user id to be used
// find and authenticate the user

import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import logger from "./lib/logger.js";

module.exports = app => {
    logger.info(`[${new Date()}][auth.js] Entering auth.js...`);
    const Users = app.db.models.Users;
    const cfg = app.lib.config;
    // get jwt secret and extract jwt from
    // Authorisation Header
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };
    // JWT authentication strategy
    logger.info(`[${new Date()}][auth.js] Initialising Passport Strategy...`);
    // payload is decoded JWT
    const strategy = new Strategy(params, (payload, done) => {
        logger.info(`[${new Date()}][auth.js] Payload = %s...`, JSON.stringify(payload));
        // find user based on id contained in payload
        logger.info(`[${new Date()}][auth.js] Passport Strategy - Locating User...`);
        Users.findById(payload.id)
          .then(user => {
              logger.info(`[${new Date()}][auth.js] Initialising Passport Strategy...`);
              // if user found, build
              // return payload
              if (user) {
                  logger.info(`[${new Date()}][auth.js] User found, returning callback...`);
                  return done(null, {
                      id: user.id,
                      email: user.email
                  });
              }
              // user not found, return nothing
              logger.info(`[${new Date()}][auth.js] User NOT found, returning callback...`);
              return done(null, false);
          })
          .catch(error => done(error, null));
    });
    // specify strategy to be used by passport
    logger.info(`[${new Date()}][auth.js] Executing passport.use(strategy)...`);
    passport.use(strategy);
    logger.info(`[${new Date()}][auth.js] Returning initialize() and authenticate()...`);
    return {
        // initialise passport middleware
        initialize: () => {
            logger.info(`[${new Date()}][auth.js] Executing passport.initialize()...`);
            return passport.initialize();
        },
        // called by routes to authenticate user
        // this will authenticate jwt token
        authenticate: () => {
            logger.info(`[${new Date()}][auth.js] Executing passport.authenticate()...`);
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};