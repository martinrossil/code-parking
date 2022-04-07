import Provider from './vo/Provider';
import Genre from './vo/Genre';

export function getQueryString(providerSegment: string, genreSegment: string, sortSegment: string, pageSegment: string): string {
    let providersQuery = '';
    for (const provider of providers) {
        if (providerSegment.indexOf(provider.slug) !== -1) {
            providersQuery += provider.id + '|'
        }
    }
    if (providersQuery) {
        providersQuery = 'with_watch_providers=' + providersQuery.substring(0, providersQuery.length - 1) + '&';
    }

    let genresQuery = '';
    for (const genre of genres) {
        if (genreSegment.indexOf(genre.slug) !== -1) {
            genresQuery += genre.id + '|'
        }
    }
    if (genresQuery) {
        genresQuery = 'with_genres=' + genresQuery.substring(0, genresQuery.length - 1) + '&';
    }

    let sortQuery = '';
    if (sortSegment === 'a') {
        sortQuery = 'sort_by=popularity.desc&';
    } else if (sortSegment === 'b') {
        sortQuery = 'sort_by=vote_average.desc&vote_count.gte=200&';
    } else if (sortSegment === 'c') {
        const date = new Date().toISOString().split('T')[0];
        sortQuery = 'sort_by=primary_release_date.desc&primary_release_date.lte=' + date + '&';
    }

    let pageQuery = '';
    if (pageSegment) {
        const page = parseInt(pageSegment);
        if (!isNaN(page) && page > 0) {
            pageQuery = 'page=' + page + '&';
        }
    }
    return providersQuery + genresQuery + sortQuery + pageQuery;
}

const providers: Array<Provider> = [
    new Provider('Amazon Prime', 119, 'b'),
    new Provider('Apple Itunes', 2, 'c'),
    new Provider('Apple TV+', 350, 'd'),
    new Provider('Blockbuster', 423, 'e'),
    new Provider('C More', 77, 'f'),
    new Provider('Dansk Filmskat', 621, 'g'),
    new Provider('Disney+', 337, 'h'),
    new Provider('DR TV', 620, 'i'),
    new Provider('Filmstriben', 443, 'j'),
    new Provider('HBO Max', 384, 'k'),
    new Provider('Netflix', 8, 'l'),
    new Provider('Paramount+', 531, 'm'),
    new Provider('SF Anytime', 426, 'n'),
    new Provider('TV2 Play', 383, 'o'),
    new Provider('Viaplay', 76, 'p')
];

const genres: Array<Genre> = [
    new Genre('Action', 28, 'b'),
    new Genre('Animation', 16, 'c'),
    new Genre('Dokumentar', 99, 'd'),
    new Genre('Drama', 18, 'e'),
    new Genre('Eventyr', 12, 'f'),
    new Genre('Familie', 10751, 'g'),
    new Genre('Fantasy', 14, 'h'),
    new Genre('Gyser', 27, 'i'),
    new Genre('Historie', 36, 'j'),
    new Genre('Komedie', 35, 'k'),
    new Genre('Krig', 10752, 'l'),
    new Genre('Krimi', 80, 'm'),
    new Genre('Musik', 10402, 'n'),
    new Genre('Mysterie', 9648, 'o'),
    new Genre('Romantik', 10749, 'p')
];
