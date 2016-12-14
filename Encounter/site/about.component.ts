import { Component } from "@angular/core";

@Component({
    selector: "zev-app",
    templateUrl: "pages/about.component.html",
    styleUrls: ["styles/about.component.css", "styles/card.css"]
})

export class AboutComponent {

    // Everything below is just some perversion for crawlers
    // grabbing my phone number
    phone: string = "Phone";

    private cellNumber: string = "1-778-676-8771";

    showPhone(): void {
        this.phone = this.cellNumber;
    }

    hidePhone(): void {
        this.phone = "Phone";
    }

    callPhone(): void {
        window.open(`tel:${this.cellNumber}`);
    }
}