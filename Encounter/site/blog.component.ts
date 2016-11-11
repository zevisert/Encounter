import { Component, OnInit, Inject} from "@angular/core";

import { Post } from "./post"
import { BlogService } from "./blog.service"

@Component({
    selector: "my-app",
    templateUrl: "pages/blog.component.html",
    styleUrls: ["styles/blog.component.css", "styles/card.css"]
})

export class BlogComponent implements OnInit {
    posts: Post[];

    constructor( @Inject(BlogService) private blogService: BlogService) { }

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(): void {
        this.blogService.getPosts().then(posts => this.posts = posts);
        console.log(this.posts);
    }
}