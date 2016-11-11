import * as express from "express";

var apiRouter: express.Router = express.Router();

apiRouter.get("/",
    (req: express.Request, res: express.Response) => {
        res.send("API base page");
    });

apiRouter.post("/auth",
    (req: express.Request, res: express.Response) => {
        res.json({
            success: false,
            message: "Not implemented",
            token: null
        });
    });

apiRouter.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    var token = (req.query && req.query.token) || (req.body && req.body.token) || (req.headers["x-access-token"]);

    if (token) {
        // decode token

        // if token ok
        next(); // make sure we go to the next routes and don't stop here
    } else {
        // if there is no token
        // return an HTTP response of 403 (access forbidden) and an error message
        return res.status(403)
            .send({
                success: false,
                message: "No token provided. What are you even trying to do?"
            });
    }
});

apiRouter.route("/posts")
    // Get all posts
    .get((req: express.Request, res: express.Response) => {

    })

    // Create a new post
    .put((req: express.Request, res: express.Response) => {
        
    });


apiRouter.route("/post/:id")
    // Get a specific post
    .get((req: express.Request, res: express.Response) => {

    })

    // Delete a post
    .delete((req: express.Request, res: express.Response) => {

    })

    // Update a post
    .post((req: express.Request, res: express.Response) => {

    });

export { apiRouter };