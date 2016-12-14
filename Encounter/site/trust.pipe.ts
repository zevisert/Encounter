import { Inject, Pipe, PipeTransform } from "@angular/core";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: "trust"
})
export class TrustHtml implements PipeTransform {

    constructor(@Inject(DomSanitizer) private sanitizer: DomSanitizer) { }

    transform(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
} 