"use strict";
var express = require("express");
exports.apiRouter = express.Router();
exports.apiRouter.get("/", function (req, res) {
    res.send("API base page");
});
exports.apiRouter.post("/auth", function (req, res) {
    res.json({
        success: false,
        message: "Not implemented",
        token: null
    });
});
exports.apiRouter.use(function (req, res, next) {
    var token = (req.query && req.query.token) || (req.body && req.body.token) || (req.headers["x-access-token"]);
    if (token) {
        // decode token
        // if token ok
        next(); // make sure we go to the next routes and don't stop here
    }
    else {
        // if there is no token
        // return an HTTP response of 403 (access forbidden) and an error message
        return res.status(403)
            .send({
            success: false,
            message: "No token provided. What are you even trying to do?"
        });
    }
});
exports.apiRouter.route("/posts")
    .get(function (req, res) {
})
    .put(function (req, res) {
});
exports.apiRouter.route("/post/:id")
    .get(function (req, res) {
})
    .delete(function (req, res) {
})
    .post(function (req, res) {
});
//# sourceMappingURL=Post-API.js.map