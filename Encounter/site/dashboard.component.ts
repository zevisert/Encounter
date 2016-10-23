import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    template: `<p>{{title}}</p>`,
    styleUrls: ["styles/dashboard.component.css"]
})

export class DashboardComponent {
    title: string = "Zev Isert Website";
}