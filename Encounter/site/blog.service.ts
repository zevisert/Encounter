import { Injectable, Inject } from "@angular/core";

import { Headers, Http, Response } from "@angular/http";

//import { AuthHttp } from "angular2-jwt";

import "rxjs/add/operator/toPromise"

import { PostData } from "./post.data";

@Injectable()
export class BlogService {

    private postsUrl = 'api/posts';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private cachedPosts: PostData[];
    private cachedPromise: Promise<PostData[]>;

    constructor(@Inject(Http) private http: Http) { }

    getPosts(): Promise<PostData[]> {
        if (this.cachedPosts) {
            // Have data, return it
            return Promise.resolve(this.cachedPosts);
        }
        else if (this.cachedPromise) {
            // Don't have data, but have an observable.
            // A request must be in progress, return the obs
            return this.cachedPromise;
        } else {
            this.cachedPromise = this.http.get(this.postsUrl)
                .toPromise()
                .then((res: Response) => {
                    this.cachedPosts = res.json() as PostData[];
                    // Have the data now, don't need the promise
                    this.cachedPromise = null;
                    return this.cachedPosts;
                })
                .catch(this.handleError);
            return this.cachedPromise;
        }
    }

    getPost(id: number): Promise<PostData> {
        return this.getPosts()
            .then(posts => posts.find(post => post.date === id));
    }

    private handleError(error: any): Promise<any> {
        console.error("Error in Blog Service!", error);
        return Promise.reject(error.message || error);
    }
}