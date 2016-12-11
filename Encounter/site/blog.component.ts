import { Component, OnInit, Inject} from "@angular/core";
import { Router } from "@angular/router";

import { Post } from "./post"
import { BlogService } from "./blog.service"

@Component({
    selector: "zev-app",
    templateUrl: "pages/blog.component.html",
    styleUrls: ["styles/blog.component.css", "styles/card.css"]
})

export class BlogComponent implements OnInit {
    posts: Post[];
    selectedPost: Post;

    constructor(@Inject(BlogService) private blogService: BlogService, @Inject(Router) private router: Router) {
        this.selectedPost = null;
        this.posts = new Array<Post>();
    }

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(): void {
        this.blogService.getPosts().then(posts => {
            posts.forEach(post => this.posts.push(new Post(post)));
        });
    }

    onSelectPost(post: Post): void {
        this.selectedPost = post;
    }

    gotoPost(post: Post): void {
        // Wait for the animation to finish before moving to the next page
        setTimeout(() => this.router.navigate(["/post", post.getId()]), 300);
    }
}