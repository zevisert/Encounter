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

@Injectable()
export class AuthService {

    private authURL: string = "api/auth";
    private tokenName: string = "blog_auth";
    private patternSolution: string = "***REMOVED***";

    public needAuth$: Subject<string> = new Subject<string>();
    public doneAuth$: Subject<void> = new Subject<void>();
    public errorAuth$: Subject<void> = new Subject<void>();

    constructor(
        @Inject(Http) private http: Http,
        @Inject(Router) private router: Router)
    { }

    login(accessRoute: string): void {
        this.needAuth$.next(accessRoute);
    }

    logout(): void {
        localStorage.removeItem(this.tokenName);
    }

    loggedIn(): boolean {
        return tokenNotExpired(this.tokenName);
    }

    validate(pattern: string, route: string): void {
        if (pattern === this.patternSolution) {
            this.postAuth("", route);
        } else this.errorAuth$.next();
    }

    namedAccess(name: string, route: string) {
        this.postAuth(name, route);
    }

    private postAuth(body: string, route: string): void {
        this.http.post(this.authURL, "")
            .toPromise()
            .then((res: Response) => {
                localStorage.setItem(this.tokenName, res.json().token);

                this.doneAuth$.next();
                this.router.navigateByUrl(route);
            });
    }
}