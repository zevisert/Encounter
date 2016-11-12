import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";

@Component({
    selector: "my-app",
    encapsulation: ViewEncapsulation.None,
	templateUrl: "pages/app.component.html",
	styleUrls: ["styles/app.component.css"]
})

export class AppComponent implements OnInit{

    constructor(@Inject("particlesJS") private particles: any) { }

    ngOnInit(): void {
        this.particles.load("particles-background", "assets/particles.json");
    }
}