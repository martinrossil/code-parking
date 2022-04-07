export default class Provider {
    public id: number
    public label: string;
    public slug: string;
    public constructor(label: string, id: number, slug: string) {
        this.label = label;
        this.id = id;
        this.slug = slug;
    }
}
