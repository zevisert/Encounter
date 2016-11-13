import { Injectable, Inject } from "@angular/core";

import { Headers, Http, Response } from "@angular/http";

//import { AuthHttp } from "angular2-jwt";

import "rxjs/add/operator/toPromise"

import { PostData } from "./post.data";

@Injectable()
export class BlogService {

    private allPostsUrl = "api/posts";
    private singlePostUrl = "api/post/"
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
            this.cachedPromise = this.http.get(this.allPostsUrl)
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
        if (this.cachedPosts) {
            // We've got all the posts, so just return the correct one
            return Promise.resolve(this.cachedPosts.find(post => (post.date === id)));
        } else {
            // Make the request for the single post
            return this.http.get(this.singlePostUrl + id)
                .toPromise()
                .then((res: Response) => {
                    return res.json() as PostData;
                })
                .catch(this.handleError);
        }
    }

    private handleError(error: any): Promise<any> {
        console.error("Error in Blog Service!", error);
        return Promise.reject(error.message || error);
    }
}