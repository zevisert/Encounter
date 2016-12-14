import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

export function main(params: any) {
    const platform = platformBrowserDynamic(
        [
            { provide: "particlesJS", useValue: params.injections.particles },
            { provide: "PatternLock", useValue: params.injections.patternlock },
            { provide: "jQuery", useValue: params.injections.jQuery }
        ]);
    platform.bootstrapModule(AppModule);
}
