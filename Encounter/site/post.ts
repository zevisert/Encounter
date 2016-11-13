import { PostData } from "./post.data";

export class Post {

    hasImage: boolean;
    imageUrl: string;
    body: string;
    title: string;

    constructor(private postData: PostData) {
        this.hasImage = this.postData.imageFileName.length > 0;
        this.imageUrl = "/images/photos/" + this.postData.date.toString() + "/" + this.postData.imageFileName;
        this.body = postData.body;
        this.title = postData.title;
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