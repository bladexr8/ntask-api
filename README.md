# NTask REST API
Example Node/Express API from Apress "Building APIs with Node.js"

This example app demonstrates a complete Node.js/Express REST API with some interesting features:

- ES2016 syntax and babel transpiler
- Testing with Mocha and Chai
- SQL database interaction with Sequelize
- Middleware configuration and organisation with the "consign" module
- User Authentication with passport.js and the jwt strategy
- Automated API Documentation using APIDoc
- Enabling CORS
- Enabling clusters for parallel processing
- Secure server using https
- GZIP compression of responses
- Extra API Security using the "helmet" module

## Installation
1. Clone git repository
2. $ npm install

## Run in Development Mode
$ npm start

## Run in Test Mode
$ npm test

*NOTE:* for https you will need to supply your own certificate files server.key and server.crt.
        To generate self signed keys follow instructions at: https://devcenter.heroku.com/articles/ssl-certificate-self