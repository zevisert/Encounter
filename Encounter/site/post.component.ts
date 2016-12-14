import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    ViewChild,
    ElementRef,
    ViewEncapsulation,
    NgZone
} from "@angular/core";

import { ActivatedRoute, Params, Router } from "@angular/router";

import { Post } from "./post";
import { BlogService } from "./blog.service";

import { TrustHtml } from "./trust.pipe";

@Component({
    selector: "zev-app",
    templateUrl: "pages/post.component.html",
    styleUrls: ["styles/post.component.css", "styles/card.css"],
    encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {

    post: Post;
    observer: MutationObserver;

    @ViewChild("postBody") inserted: ElementRef;

    constructor(
        @Inject(BlogService) private blogService: BlogService,
        @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
        @Inject(NgZone) private ngZone: NgZone,
        @Inject(Router) private router: Router,
        @Inject("jQuery") private $: any
    ) {
        (window as any).routerGoto = this.routerGoto.bind(this);
    }

    ngOnInit(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            const id: number = +params["id"];
            this.blogService
                .getPost(id)
                .then(data => {
                    this.post = new Post(data);
                    if (this.post.hasScripts) {
                        this.loadScripts();
                    }
                });
        });
    }

    loadScripts(): void {
        if (this.blogService.haveDisplayed(this.post.getId())) {
            this.executeImportedScripts();
        } else {
            this.observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === "childList") {
                        this.executeImportedScripts();
                    } else {
                        this.observer = null;
                        console.warn(`Observer has been disposed: ${this.observer}`);
                    }
                });
            });

            // Notify for childList only
            const observerConfig = {
                attributes: false,
                childList: true,
                characterData: false
            };

            const targetNode: HTMLElement = document.getElementById("postBody");
            this.observer.observe(targetNode, observerConfig);
        }
    }

    executeImportedScripts(): void {
        if (this.blogService.haveDisplayed(this.post.getId()) === false) {
            const tags: NodeListOf<HTMLScriptElement> = this.inserted.nativeElement.getElementsByTagName("script");
            const scripts: HTMLScriptElement[] = Array.prototype.slice.call(tags);

            if (scripts.length === 0 && !this.$("[data-gist]")) {
                console.warn("No scripts found to be loaded in this post!");
            } else {
                for (let script of scripts) {
                    if (script.src !== "") {
                        const tag: HTMLScriptElement = document.createElement("script");
                        tag.setAttribute("async", "");
                        tag.src = script.src;
                        document.head.appendChild(tag);
                    } else {
                        eval(script.innerHTML);
                    }
                }

                // Gists don't load with the above method, so I'm using this jQuery plugin
                this.$("[data-gist]").gist();
                this.blogService.displayed(this.post.getId());
            }
        } else {
            setTimeout(() => {
                this.$("[data-gist]").gist();
                ((window as any).instgrm.Embeds.process)();
            }, 100 );
        }
    }

    back(): void {
        // Wait for the button animation to complete before moving back
        setTimeout(() => window.history.back(), 300);
    }

    routerGoto(location: string): void {
        this.ngZone.run(() => this.router.navigateByUrl(location));
    }

    ngOnDestroy(): void {
        (window as any).routerGoto = null;
        this.observer = null;
    }
}
