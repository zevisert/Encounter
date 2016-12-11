import { Injectable, Inject } from "@angular/core";

import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

import { CanActivate } from "@angular/router";

// Import our authentication service
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(AuthService) private auth: AuthService,
        @Inject(Router) private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.auth.loggedIn()) {

            this.auth.login(route.url.join("/"));

            return false;
        }
        return true;
    }

}