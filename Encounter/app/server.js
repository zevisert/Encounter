/// <reference path="typings/index.d.ts"/>
"use strict";
var express = require("express");
var path_1 = require("path");
var morgan = require("morgan");
var Post_API_1 = require("./routes/Post-API");
var app = express();
app.disable("x-powered-by");
//app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use("/node_modules", express.static(path_1.join(__dirname, "../node_modules")));
app.use("/app", express.static(path_1.join(__dirname, "../app")));
app.use(express.static(path_1.join(__dirname, "../public")));
//app.use(json());
//app.use(urlencoded({ extended: true }));
// api routes
app.use("/api", Post_API_1.apiRouter);
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(morgan("dev"));
}
app.get("*", function (req, res) {
    res.send("Hello!");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
app.listen(process.env.PORT, function () {
    console.log("App listening on " + process.env.PORT);
});
//# sourceMappingURL=server.js.map