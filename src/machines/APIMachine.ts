import { IEventListener, IState, Machine, State } from 'enta';
import FilmDB from '../FilmDB';
import Model from '../state/Model';
import IMoviesPage from '../dto/IMoviesPage';
import { moviesPageJSONToMoviesPage } from '../dto/JSONAdapter';

export default class APIMachine extends Machine<FilmDB> {
    public constructor(host: FilmDB) {
        super(host);
        this.initial.addTransition('URL_CHANGED', this.urlChanged);
        host.addEventListener('URL_CHANGED', this.send);
    }

    private _urlChanged!: IState;
    private get urlChanged(): IState {
        if (!this._urlChanged) {
            this._urlChanged = new State('UrlChanged');
            this._urlChanged.on = this.onUrlChanged as unknown as IEventListener;
            this._urlChanged.next = this.initial;
        }
        return this._urlChanged;
    }

    private async onUrlChanged(e: CustomEvent<string>): Promise<void> {
        console.log('detail', e.detail);
        if (e.detail.startsWith('/film/')) {
            await this.getMovie(e.detail);
        } else {
            Model.movies.removeAll();
            await this.getMoviesPage(e.detail);
        }
    }

    private async getMovie(uid: string): Promise<void> {
        console.log('getMovie', uid);
    }

    private async getMoviesPage(path: string): Promise<void> {
        try {
            // const response = await fetch('https://filmdb.pages.dev/api' + e.detail);
            const response = await fetch('https://filmdb.pages.dev/api' + path);
            const moviesPageSJON: IMoviesPage = await response.json();
            const moviesPage: IMoviesPage = moviesPageJSONToMoviesPage(moviesPageSJON);
            Model.movies.addItems(moviesPage.movies);
        } catch (error) {
            console.log(error);
        }
    }
}
