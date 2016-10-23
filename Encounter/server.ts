/// <reference path="typings/index.d.ts"/>

import * as express from "express";
import * as morgan from "morgan";

import { apiRouter } from "./routes/Post-API";

var app = express();

const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.set("port", port);

app.use("/api", apiRouter);

app.get("*", (req, res) => {
    res.send("Hello");
});


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});