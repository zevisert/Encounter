/// <reference path="typings/index.d.ts"/>

import * as express from "express";
import { join } from "path";
import * as morgan from "morgan";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";

import { apiRouter } from "./routes/Post-API";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicons/favicon.ico")));
app.use("/node_modules", express.static(join(__dirname, "../node_modules")));
app.use("/app", express.static(join(__dirname, "../app")));
app.use(express.static(join(__dirname, "../public")));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", apiRouter);

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req: express.Request, res: express.Response) => {
    return res.redirect("/");
});

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on ${process.env.PORT}`);
})