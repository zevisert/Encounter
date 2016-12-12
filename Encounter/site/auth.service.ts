import {
    Inject,
    Injectable,
    Output
} from "@angular/core";

import { Headers, Http, Response } from "@angular/http";

import { Router } from "@angular/router";

import { tokenNotExpired } from "angular2-jwt";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

export class AuthBody {
    type: string;
    payload: string;
}

@Injectable()
export class AuthService {

    private authURL: string = "api/auth";
    private tokenName: string = "blog_auth";

    public needAuth$: Subject<string> = new Subject<string>();
    public doneAuth$: Subject<void> = new Subject<void>();
    public errorAuth$: Subject<"pattern"|"name"> = new Subject<"pattern"|"name">();

    constructor(
        @Inject(Http) private http: Http,
        @Inject(Router) private router: Router)
    { }

    login(accessRoute: string): void {
        // Signals the main component to launch an auth modal
        this.needAuth$.next(accessRoute);
    }

    logout(): void {
        // Unused right now, removes the blog token
        localStorage.removeItem(this.tokenName);
    }

    loggedIn(): boolean {
        // Checks that the blog token isn't expired,
        // the auth guard uses this to check if a user can navigate to
        // a specific route
        return tokenNotExpired(this.tokenName);
    }

    validate(pattern: string, route: string): void {

        let body: AuthBody = { type: "Anonymous", payload: pattern };

        // Fire off a request to the server to see if the pattern entered is valid
        this.postAuth(body)
            .then((success: boolean) => {
                if (success) {
                    // Result was good, close the modal
                    this.doneAuth$.next();
                    // And move to wherever we were tring to go
                    this.router.navigateByUrl(route);
                } else {
                    // Pattern was rejected
                    this.errorAuth$.next("pattern");
                }
            })
            .catch(this.handleError);
    }

    namedAccess(name: string, route: string) {
        let body: AuthBody = { type: "Named", payload: name };

        // Fire off a request to the server to see if this name is good enough
        this.postAuth(body)
            .then((success: boolean) => {
                if (success) {
                    // Name logged, close the modal
                    this.doneAuth$.next();
                    // And move on to wherever the user was trying to get to
                    this.router.navigateByUrl(route);
                } else {
                    // Name was rejected
                    this.errorAuth$.next("name");
                }
            })
            .catch(this.handleError);
    }

    private postAuth(body: AuthBody): Promise<boolean> {
        // Send the request and payload
        return this.http.post(this.authURL, body)
            .toPromise()
            .then((res: Response) => {
                if (res.json().success as boolean) {
                    // On success save the token
                    localStorage.setItem(this.tokenName, res.json().token);                    
                }
                // Report the success or failure of the request
                return res.json().success as boolean;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("Error in Auth Service!", error);
        return Promise.reject(error.message || error);
    }
}