export class Post {
    id: number;
    title: string;
    body: string;
    date: Date;
    image: URL;

    truncate(n: number): string {
        var tooLong: boolean = this.body.length > n;
        var s: string = tooLong ? this.body.substr(0, n - 1) : this.body;
        s = tooLong ? s.substr(0, s.lastIndexOf(" ")) : s;
        return tooLong ? s + "..." : s;
    }
}