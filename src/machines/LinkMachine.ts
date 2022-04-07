import { IEventListener, IState, Machine, State } from 'enta';
import FilmDB from '../FilmDB';
import Model from '../state/Model';
import ILink from '../vo/ILink';

export default class LinkMachine extends Machine<FilmDB> {
    public constructor(host: FilmDB) {
        super(host);
        this.initial.addTransition('URL_CHANGED', this.urlChanged);
        this.host.addEventListener('URL_CHANGED', this.send);
    }

    private _urlChanged!: IState;
    private get urlChanged(): IState {
        if (!this._urlChanged) {
            this._urlChanged = new State('UrlChanged');
            this._urlChanged.on = this.onUrlChanged as IEventListener;
            this._urlChanged.next = this.initial;
        }
        return this._urlChanged;
    }

    private onUrlChanged(e: CustomEvent<string>): void {
        const url = e.detail;
        if (!url.startsWith('/film/')) {
            this.updateModelFromUrl(url);
            this.updateSelectedFilters();
        }
    }

    private updateModelFromUrl(url: string): void {
        const filters: Array<string> = url.split('/');
        const providers = this.sanitized(filters[1], this.validProviders, 'a');
        const genres = this.sanitized(filters[2], this.validGenres, 'a');
        const sort = this.sanitized(filters[3], this.validSort, 'a');
        const page = this.sanitizedPageNumber(filters[4]);
        this.updateModel(providers, genres, sort, page);
    }

    private updateSelectedFilters(): void {
        console.log('updateSelectedFilters()');
        this.updateProviderLinks();
        this.updateGenresLinks();
    }

    private updateGenresLinks(): void {
        const selectedGenres = Model.selectedGenres.value;
        for (const link of Model.genres.source) {
            let href = '/' + Model.selectedProviders.value;
            href += this.updateLink(link, selectedGenres) + '/';
            href += Model.selectedSort.value + '/';
            href += Model.selectedMoviePage.value;
            link.href = href;
        }
    }

    private updateProviderLinks(): void {
        const selectedProviders = Model.selectedProviders.value;
        for (const link of Model.providers.source) {
            let href = this.updateLink(link, selectedProviders) + '/';
            href += Model.selectedGenres.value + '/';
            href += Model.selectedSort.value + '/';
            href += Model.selectedMoviePage.value;
            link.href = href;
        }
    }

    private updateLink(link: ILink, path: string): string {
        const slug = link.slug;
        let href = '/';
        if (path === 'a') {
            href += slug;
            link.selected = false;
        } else {
            const includes = path.includes(slug);
            link.selected = includes;
            if (includes) {
                href += path.replace(slug, '');
                if (href === '/') {
                    href = '/a';
                }
            } else {
                href += path + slug;
            }
        }
        return href;
    }

    private updateModel(providers = 'a', genres = 'a', sort = 'a', page = 1): void {
        Model.selectedProviders.value = providers;
        Model.selectedGenres.value = genres;
        Model.selectedSort.value = sort;
        Model.selectedMoviePage.value = page;
    }

    private validProviders = 'bcdefghijklmnop';
    private validGenres = 'bcdefghijklmnop';
    private validSort = 'abc';

    private sanitized(value: string | undefined, validLetters: string, defaultValue: string): string {
        if (!value || value.includes('%')) {
            return defaultValue;
        }
        let sanitized = '';
        let char = '';
        for (let i = 0; i < value.length; i++) {
            char = value.charAt(i);

            if (validLetters.includes(char)) {
                sanitized += char;
            }
        }
        return sanitized || defaultValue;
    }

    private sanitizedPageNumber(value: string | undefined): number {
        if (!value) {
            return 1;
        }
        const valueAsNumber = parseInt(value);
        if (isNaN(valueAsNumber) || valueAsNumber < 1) {
            return 1;
        }
        return Math.round(valueAsNumber);
    }
}
