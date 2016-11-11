import * as express from "express";
import { join } from "path";

const webRoutes: express.Router = express.Router();

webRoutes.get("/", express.static("app", { redirect: false }));

webRoutes.get("*", (req: express.Request, res: express.Response) => {
    // Step out of 'routes' then out of build folder 'app'
    return res.sendFile(join(__dirname, "../../public/index.html"));
});


export { webRoutes };