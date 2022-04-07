import { EventDispatcher } from 'fuix';
import ILink from './ILink';

export default class Link extends EventDispatcher implements ILink {
    public constructor(label: string, slug: string, href: string) {
        super();
        this.label = label;
        this.slug = slug;
        this.href = href;
    }

    public label: string;

    public slug: string;

    private _href = '';
    public set href(value: string) {
        if (this._href === value) {
            return;
        }
        this._href = value;
        this.notifyChanged();
    }

    public get href(): string {
        return this._href;
    }

    private _selected = false;
    public set selected (value: boolean) {
        if (this._selected === value) {
            return;
        }
        this._selected = value;
        this.notifyChanged();
    }

    public get selected(): boolean {
        return this._selected;
    }

    private notifyChanged(): void {
        this.dispatchCustomEvent(new CustomEvent('changed'));
    }
}
