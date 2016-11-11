import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "pages/blog.component.html",
    styleUrls: ["styles/blog.component.css", "styles/card.css"]
})

export class BlogComponent {
    title: string = "Zev Isert Website";
}