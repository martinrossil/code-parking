import { ArrayCollection, IArrayCollection } from 'fuix';
import IMovie from '../dto/IMovie';
import ILink from '../vo/ILink';
import Link from '../vo/Link';

export default class Model {
    public static movies: IArrayCollection<IMovie> = new ArrayCollection();

    private static _genres: IArrayCollection<ILink>;
    public static get genres(): IArrayCollection<ILink> {
        if (!this._genres) {
            const genres: Array<ILink> = [
                new Link('Action', 'action', '/alle/action'),
                new Link('Animation', 'animation', '/alle/animation'),
                new Link('Dokumentar', 'dokumentar', '/alle/dokumentar'),
                new Link('Drama', 'drama', '/alle/drama'),
                new Link('Eventyr', 'eventyr', '/alle/eventyr'),
                new Link('Familie', 'familie', '/alle/familie'),
                new Link('Gyser', 'gyser', '/alle/gyser'),
                new Link('Historie', 'historie', '/alle/historie'),
                new Link('Komedie', 'komedie', '/alle/komedie'),
                new Link('Krig', 'krig', '/alle/krig'),
                new Link('Krimi', 'krimi', '/alle/krimi'),
                new Link('Musik', 'musik', '/alle/musik'),
                new Link('Mysterie', 'mysterie', '/alle/mysterie'),
                new Link('Romantik', 'romantik', '/alle/romantik'),
                new Link('Sci-Fi', 'sci-fi', '/alle/sci-fi')
            ];
            this._genres = new ArrayCollection(genres);
        }
        return this._genres;
    }

    private static _providers: IArrayCollection<ILink>;
    public static get providers(): IArrayCollection<ILink> {
        if (!this._providers) {
            const providers: Array<ILink> = [
                new Link('Amazon Prime', 'amazon-prime', '/amazon-prime'),
                new Link('Apple Itunes', 'apple-itunes', '/apple-itunes'),
                new Link('Apple TV+', 'apple-tv-plus', '/apple-tv-plus'),
                new Link('Blockbuster', 'blockbuster', '/blockbuster'),
                new Link('C More', 'c-more', '/c-more'),
                new Link('Dansk Filmskat', 'dansk-filmskat', '/dansk-filmskat'),
                new Link('Disney+', 'disney-plus', '/disney-plus'),
                new Link('DR TV', 'dr-tv', '/dr-tv'),
                new Link('Filmstriben', 'filmstriben', '/filmstriben'),
                new Link('HBO Max', 'hbo-max', '/hbo-max'),
                new Link('Netflix', 'netflix', '/netflix'),
                new Link('Paramount+', 'paramount-plus', '/paramount-plus'),
                new Link('SF Anytime', 'sf-anytime', '/sf-anytime'),
                new Link('TV2 Play', 'tv2-play', '/tv2-play'),
                new Link('Viaplay', 'viaplay', '/viaplay')
            ];
            this._providers = new ArrayCollection(providers);
        }
        return this._providers;
    }
}
