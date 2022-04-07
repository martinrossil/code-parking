import { IState, Machine, State } from 'enta';
import FilmDB from '../FilmDB';

export default class NavigationMachine extends Machine<FilmDB> {
    public constructor(host: FilmDB) {
        super(host);
        this.initial.addTransition('load', this.loadComplete);
        this.initial.addTransition('click', this.clickedState);
        this.initial.addTransition('popstate', this.poppedState);
        window.addEventListener('load', this.send, { once: true });
        window.addEventListener('click', this.send);
        window.addEventListener('popstate', this.send);
    }

    private _clickedState!: IState;
    private get clickedState(): IState {
        if (!this._clickedState) {
            this._clickedState = new State('ClickedState');
            this._clickedState.on = this.onClickedState;
            this._clickedState.next = this.initial;
        }
        return this._clickedState;
    }

    private _poppedState!: IState;
    private get poppedState(): IState {
        if (!this._poppedState) {
            this._poppedState = new State('Popped');
            this._poppedState.on = this.onPoppedState;
            this._poppedState.next = this.initial;
        }
        return this._poppedState;
    }

    private _loadComplete!: IState;
    private get loadComplete(): IState {
        if (!this._loadComplete) {
            this._loadComplete = new State('LoadComplete');
            this._loadComplete.on = this.onLoadComplete;
            this._loadComplete.next = this.initial;
        }
        return this._loadComplete;
    }

    private onClickedState(e: Event) {
        const anchor: HTMLAnchorElement | null = this.getAnchorFromEventTarget(e.target);
        if (anchor) {
            e.preventDefault();
            if (location.pathname.toLowerCase() !== anchor.pathname) {
                const path = anchor.pathname;
                console.log('anchor pathname', path);
                history.pushState(null, '', path);
                // this.updateDocumentTitle(index);
                this.notify('URL_CHANGED');
            }
        }
    }

    private onPoppedState(): void {
        console.log('onPoppedState', location.pathname.toLowerCase());
        // this.updateDocumentTitle(index);
        this.notify('URL_CHANGED');
    }

    private onLoadComplete(): void {
        console.log('onLoadComplete', location.pathname.toLowerCase());
        this.notify('URL_CHANGED');
    }

    private notify(type: string): void {
        this.host.dispatch(type, location.pathname.toLowerCase());
    }

    private getAnchorFromEventTarget(target: EventTarget | null): HTMLAnchorElement | null {
        if (target instanceof HTMLAnchorElement) {
            return target;
        }
        if (target instanceof Document) {
            return null;
        }
        const targetNode: Node = target as Node;
        const parent: Node | null = targetNode.parentNode;
        return this.getAnchorFromEventTarget(parent);
    }
}
