import { IEventListener, IState, Machine, State } from 'enta';
import FilmDB from '../FilmDB';

export default class FilmDBMachine extends Machine<FilmDB> {
    public constructor(host: FilmDB) {
        super(host);
        this.initial.addTransition('load', this.loadComplete);
        window.addEventListener('load', this.send, { once: true });
        host.addEventListener('URL_CHANGED', this.send);
        host.addEventListener('MOVIE_URL_CHANGED', this.send);
        host.addEventListener('FILTER_URL_CHANGED', this.send);
    }

    private _loadComplete!: IState;
    private get loadComplete(): IState {
        if (!this._loadComplete) {
            this._loadComplete = new State('LoadComplete');
            this._loadComplete.addTransition('URL_CHANGED', this.urlChange);
            this._loadComplete.on = this.onLoadComplete.bind(this);
        }
        return this._loadComplete;
    }

    private onLoadComplete(): void {
        console.log('onLoadComplete');
        this.host.dispatchEvent(new CustomEvent('URL_CHANGED', { detail: location.pathname.toLowerCase() }));
    }

    private _urlChange!: IState;
    private get urlChange(): IState {
        if (!this._urlChange) {
            this._urlChange = new State('UrlChange');
            this._urlChange.addTransition('MOVIE_URL_CHANGED', this.clearMovieModel);
            this._urlChange.on = this.onUrlChange.bind(this) as IEventListener;
        }
        return this._urlChange
    }

    private onUrlChange(e: CustomEvent<string>): void {
        console.log('onUrlChanged', e.type, e.detail);
        if (e.detail.startsWith('/film/')) {
            this.host.dispatchEvent(new CustomEvent('MOVIE_URL_CHANGED', { detail: e.detail }));
        } else {
            this.host.dispatchEvent(new CustomEvent('FILTER_URL_CHANGED', { detail: e.detail }));
        }
    }

    private _clearMovieModel!: IState;
    private get clearMovieModel(): IState {
        if (!this._clearMovieModel) {
            this._clearMovieModel = new State('ClearMovieModel');
            this._clearMovieModel.on = this.onClearMovieModel.bind(this) as IEventListener;
        }
        return this._clearMovieModel;
    }

    private onClearMovieModel(e: CustomEvent<string>): void {
        console.log('onClearMovieModel', e.detail);
    }
}
