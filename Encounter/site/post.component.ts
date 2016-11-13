import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Post } from "./post";
import { BlogService } from "./blog.service";

@Component({
    selector: "my-app",
    templateUrl: "pages/post.component.html",
    styleUrls: ["styles/post.component.css", "styles/card.css"]
})

export class PostComponent implements OnInit {

    post: Post;

    constructor(@Inject(BlogService) private blogService: BlogService, @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            const id: number = +params["id"];
            this.blogService
                .getPost(id)
                .then(data => this.post = new Post(data));
        });
    }

   back(): void {
        // Wait for the button animation to complete before moving back
        setTimeout(() => window.history.back(), 300);
    }
}