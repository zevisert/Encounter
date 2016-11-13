import * as express from "express";
import * as jwt from "jsonwebtoken";
import { join } from "path";
import * as fs from "fs";

const apiRouter: express.Router = express.Router();
const superSecret: string = process.env.SECRET;
let blogData: JSON | any = require(join(__dirname, "../../private/posts.json"));

apiRouter.get("/",
    (req: express.Request, res: express.Response) => {
        res.send("API base page");
    });

apiRouter.post("/auth",
    (req: express.Request, res: express.Response) => {
        let token: string = jwt.sign(
            {
                time: new Date()
            },
            superSecret,
            {
                expiresIn: "2h"
            }
        );

        let created = new Date();
        let expires = created.setHours(created.getHours() + 2);
        res.json({
            success: token != null,
            message: token != null ? "Token created at: " + created: "Unable to create token",
            expires: token != null ? expires : null,
            token: token
        });
    });

/* apiRouter.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    var token = (req.query && req.query.token) || (req.body && req.body.token) || (req.headers["x-access-token"]);

    if (token) {
        // decode token
        jwt.verify(token, superSecret, (err: any, decoded: express.Request) => {
            if (err) {
                return res.json({ success: false, message: "Get outta here with your untrusted token!" });
            }
            else {
                next(); // make sure we go to the next routes and don't stop here
            }
        });
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
}); */

apiRouter.route("/posts")
    // Get all posts
    .get((req: express.Request, res: express.Response) => {
        res.json(blogData.posts);
    })

    // Create a new post
    .put((req: express.Request, res: express.Response) => {
        
    });


apiRouter.route("/post/:id")
    // Get a specific post
    .get((req: express.Request, res: express.Response) => {
        res.json(blogData.posts[req.params.id]);
    })

    // Delete a post
    .delete((req: express.Request, res: express.Response) => {

    })

    // Update a post
    .post((req: express.Request, res: express.Response) => {

    });

export { apiRouter };