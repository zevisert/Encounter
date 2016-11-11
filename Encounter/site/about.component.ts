import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "pages/about.component.html",
    styleUrls: ["styles/about.component.css", "styles/card.css"]
})

export class AboutComponent {
    title: string = "Zev Isert Website";
}