import { Injectable, Inject } from "@angular/core";

import { Headers, Http } from "@angular/http";
import { AuthHttp } from "angular2-jwt";

import "rxjs/add/operator/toPromise";

import { Post } from "./post";

@Injectable()
export class BlogService {

    private postsUrl = 'api/posts';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(@Inject(AuthHttp) private http: AuthHttp) { }

    getPosts(): Promise<Post[]> {
        return this.http.get(this.postsUrl)
            .toPromise()
            .then(response => response.json().data as Post[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("Error in Blog Service!", error);
        return Promise.reject(error.message || error);
    }
}