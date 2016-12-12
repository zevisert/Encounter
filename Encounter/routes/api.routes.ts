import * as express from "express";
import * as jwt from "jsonwebtoken";
import { join } from "path";
import * as fs from "fs";

// Routes for protected information
const apiRouter: express.Router = express.Router();

// Secret stuff
const superSecret: string = process.env.SECRET;
const passcodePattern: string = process.env.PATTERN;
const masterPattern: string = process.env.MASTER_PATTERN;

// I want names that start and end with a letter, they can have spaces, apostrophes, and hyphens in the middle
const nameRegex: RegExp = /^[\u00c0-\u01ffa-zA-z]([\u00c0-\u01ffa-zA-Z'\- ])*[\u00c0-\u01ffa-z]$/;

// Eventually I may move this to a DB, but it's small enough right now to deliver from memory
let blogData: any = require(join(__dirname, "../../private/posts.json"));

// Boring confirmation of a base page
apiRouter.get("/",
    (req: express.Request, res: express.Response) => {
        res.send("API base page");
    });

// Authentication route
apiRouter.post("/auth",
    (req: express.Request, res: express.Response) => {
        if (!req.body.type && !req.body.payload) {
            // Insufficient information provided, I need a type and payload to sign
            res.json({
                success: false,
                message: "Need to provide type and payload in order to perform auth",
                expires: null,
                token: null
            });
        } else {

            // The variables that will be signed
            let authable: boolean = false;
            let admin: boolean = false;
            let user: string = "Anon";

            // If the auth type was by the pattern lock, test the available patterns
            if (req.body.type === "Anonymous") {
                if (req.body.payload === passcodePattern) {
                    authable = true;
                }
                if (req.body.payload === masterPattern) {
                    authable = true;
                    admin = true;
                    user = "Admin";
                }
            // Otherwise if the user gave me their name test that 
            // the name matches something along the lines of a name
            } else if (req.body.type === "Named") {
                if (nameRegex.test(req.body.payload)) {
                    authable = true;
                    user = req.body.payload;
                }
            }

            // Sign the token with the date it was created
            const now: Date = new Date();

            // Log successful non-admin access in a server-side text file
            if (authable && !admin) {
                // Record the access    
                fs.appendFile("accesses.txt",
                    `Date: ${now.toLocaleString()} => Name: ${user} - IP: ${req.ip}\n`,
                    (err: Error) => {
                        if (err) console.log(`${err.name} --- ${err.message}`);
                    }
                );
            }

            // Sign if we've decided everything is good
            const token: string = authable ? jwt.sign(
                {
                    time: now,
                    user: user,
                    admin: admin
                },
                superSecret,
                {
                    expiresIn: "2h"
                }
            ) : null;

            // The return object has some convenience fields,
            // though most application logic only looks at success and token 
            const expires = now.setHours(now.getHours() + 2);
            res.json({
                success: authable,
                message: authable ? `Token created at: ${now.toLocaleString()}` : "Unable to create token",
                expires: authable ? expires : null,
                token: authable ? token : null
            });
        }
    });

// Auth verifcation route, every protected request needs to send a token with it
apiRouter.use((req: express.Request, res: express.Response, next: express.NextFunction) => {

    // Grab the token, expect front end to place it in headers, but for debugging, we'll inspect other properties
    var token = (req.headers["x-access-token"]) || (req.query && req.query.token) || (req.body && req.body.token);

    if (token) {
        // decode token
        jwt.verify(token, superSecret, (err: any, decoded: express.Request) => {
            if (err) {
                return res.json({ success: false, message: "Get outta here with your untrusted token!" });
            }
            else {
                // Token is valid
                next(); // make sure we go to the next routes and don't stop here
            }
        });
    } else {
        // There is no token
        // return an HTTP response of 403 (access forbidden) and an error message
        return res.status(403)
            .send({
                success: false,
                message: "No token provided. What are you even trying to do?"
            });
    }
});

// Any routes below the auth route above are protected

// All posts route
apiRouter.route("/posts")
    // Get all posts
    .get((req: express.Request, res: express.Response) => {
        res.json(blogData.posts);
    })

    // Create a new post
    .put((req: express.Request, res: express.Response) => {
        
    });

// Single post route
apiRouter.route("/post/:id")
    // Get a specific post
    .get((req: express.Request, res: express.Response) => {
        let post = blogData.posts.find(post => post.date === Number(req.params.id));
        res.json(post);
    })

    // Delete a post
    .delete((req: express.Request, res: express.Response) => {

    })

    // Update a post
    .post((req: express.Request, res: express.Response) => {

    });

export { apiRouter };