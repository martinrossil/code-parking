/* eslint-disable */
import IMoviesPage from '../../../filmdb/src/dto/IMoviesPage';
import { movieDiscoverPageSchemaToMoviesPage } from '../../../filmdb/functions/DTOSchemaAdapter';
import { getQueryString } from '../QueryUtil';
import { discover } from '../Tmdb';

export async function onRequest({ params }): Promise<Response> {
    if (params.path) {
        const segments: Array<string> = params.path;
        if (segments.length === 4) {
            const queryString = getQueryString(segments[0], segments[1], segments[2], segments[3]);
            return await getDiscover(queryString);
        }
        return await getDiscover('');
    }
    return await getDiscover('');
}

async function getDiscover(query: string): Promise<Response> {
    const [page, error] = await discover(query);
    if (page) {
        const moviesPage: IMoviesPage = movieDiscoverPageSchemaToMoviesPage(page);
        const moviesPageString = JSON.stringify(moviesPage, null, 4);
        return getResponse(moviesPageString);
    }
    if (error) {
        return getResponse(JSON.stringify({ error: Error }, null, 4));
    }
    return getResponse(JSON.stringify(new Error('Cloud network error'), null, 4));
}

function getResponse(body: string): Response {
    return new Response(body, {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
        }
    });
}



/* WITH KV STORE */
/*
export async function onRequest({ params, env }): Promise<Response> {
    const MOVIES_PAGE = env.TEST;
    if (params.path) {
        const segments: Array<string> = params.path;
        if (segments.length === 4) {
            const key: string = segments.join('/');
            const value: string | null = await MOVIES_PAGE.get(key);
            if (value !== null) {
                return getResponse(value);
            }
            const queryString = getQueryString(segments[0], segments[1], segments[2], segments[3]);
            return await getDicover(queryString, key, MOVIES_PAGE);
        }
        return await getDicover('', '/', MOVIES_PAGE);
    }
    const value: string | null = await MOVIES_PAGE.get('/');
    if (value !== null) {
        return getResponse(value);
    }
    return await getDicover('', '/', MOVIES_PAGE);
}

async function getDicover(query: string, key: string, MOVIES_PAGE): Promise<Response> {
    const [page, error] = await discover(query);
        if (page) {
            const moviesPage: IMoviesPage = movieDiscoverPageSchemaToMoviesPage(page);
            const moviesPageString = JSON.stringify(moviesPage, null, 4);
            const ONE_DAY = 60 * 60 * 24;
            await MOVIES_PAGE.put(key, moviesPageString, { expirationTtl: ONE_DAY })
            return getResponse(moviesPageString);
        }
        if (error) {
            return getResponse(JSON.stringify({ error: Error }, null, 4));
        }
        return getResponse(JSON.stringify(new Error('Cloud network error'), null, 4));
}


*/
