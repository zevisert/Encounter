import { Inject } from "@angular/core";

import { PostData } from "./post.data";

export class Post {

    readonly hasImage: boolean;
    readonly imageUrl: string;
    readonly body: string;
    readonly title: string;
    readonly hasScripts: boolean;

    constructor(private postData: PostData) {
        this.hasImage = this.postData.imageFileName.length > 0;
        this.imageUrl = `/images/photos/${this.postData.date.toString()}/${this.postData.imageFileName}`;
        this.body = postData.body;
        this.title = postData.title;
        this.hasScripts = postData.hasScripts;
    }

    getPostedDate(): string {
        return new Date(this.postData.date).toDateString();
    }

    getId(): number {
        return this.postData.date;
    }

    truncate(n: number): string {
        const tooLong: boolean = this.postData.body.length > n;
        let s: string = tooLong ? this.postData.body.substr(0, n - 1) : this.postData.body;
        s = tooLong ? s.substr(0, s.lastIndexOf(" ")) : s;
        return tooLong ? s + "..." : s;
    }
}