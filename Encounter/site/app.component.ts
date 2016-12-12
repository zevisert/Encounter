import {
    Component,
    ViewEncapsulation,
    OnInit,
    ViewChild,
    Inject
} from "@angular/core";

import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

import { AuthService } from "./auth.service";

import { Subject } from "rxjs/Subject";

import { mobile } from "./app.mobile-browser";

@Component({
    selector: "zevisert",
    encapsulation: ViewEncapsulation.None,
	templateUrl: "pages/app.component.html",
    styleUrls: ["styles/app.component.css"]
})

export class AppComponent implements OnInit{

    @ViewChild("authModal")
    authModal: ModalComponent;

    private lock: any = null;
    private cachedRoute: string = null;
    firstName: string = "";
    public inputError: boolean = false;

    constructor(
        @Inject("particlesJS") private particles: any,
        @Inject("PatternLock") private patternLock: any,
        @Inject(AuthService) private authService: AuthService)
    {
        this.authService.needAuth$.subscribe( (route: string)=> {
            this.openModal(route);
        });

        this.authService.doneAuth$.subscribe(() => this.closeModal());

        this.authService.errorAuth$.subscribe((errorType: "pattern"|"name") => this.errorModal(errorType));
    }

    openModal(route: string): void {
        // With a modal open, cache the route to proceed to, we're going to
        // allow the user to give us a name instead, in that case, it will be
        // a button that triggers the event, and thus won't know anything about
        // the proceeding route.

        // Also, this way we don't have to recreate the lock object each time,
        // instead we can just update the route to use
        this.cachedRoute = route;

        this.authModal.open()
            .then(() => {
                // Overwrite the last pattern lock object with a new one
                // because the route may have changed
                if (!this.lock) {
                    this.lock = new this.patternLock("#authPattern", {
                        onDraw: (pattern) => {
                            this.authService.validate(pattern, this.cachedRoute);
                        }
                    });
                } else this.lock.enable();
            });
    }

    errorModal(errorType: "pattern" | "name"): void {
        // Update the error state on the appropriate object
        if (errorType === "pattern") {
            this.lock.error();
        } else {
            this.inputError = true;
        }
    }

    closeModal(): void {
        // Essentially a destructor, except we're keeping the
        // lock object around
        this.inputError = false;
        this.cachedRoute = null;
        this.lock.reset();
        this.lock.disable();

        // Close the modal
        this.authModal.close();
    }

    namedAccessButton(): void {
        // Allow users who don't know the passcode to give me their name
        if (!this.firstName || /^\s*$/.test(this.firstName)) {
            // An empty name was provided, we can error without contacting the server
            this.inputError = true;
        }
        else this.authService.namedAccess(this.firstName, this.cachedRoute);
    }

    ngOnInit(): void {
        if (this.isMobile() === false) {
            // Only load particles on non-mobile browsers
            this.particles.load("particles-background", "assets/particles.json");
        }
    }

    isMobile(): boolean {
        let browser = navigator.userAgent || navigator.vendor;

        // Detectmobilebrowsers.com
        return mobile(browser);
    }
}