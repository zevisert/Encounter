import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	template: `
  		<h1>{{title}}</h1>
  		<router-outlet></router-outlet>
	`,
	styleUrls: ["styles/app.component.css"]
})

export class AppComponent {
	title: string = "Zev Isert's Site";
}