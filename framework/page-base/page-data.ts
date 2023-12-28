export default class PageData {
    private urlPath: string;
    private name: string;

    constructor(urlPath: string, title: string) {
        this.urlPath = urlPath;
        this.name = title;
    }

    public getUrlPath(): string {
        return this.urlPath;
    }

    public getName(): string {
        return this.name;
    }
}