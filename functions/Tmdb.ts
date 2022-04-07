import { TMDB_BASE_URL, TMDB_TOKEN } from './Config';
import IMovie from '../src/dto/IMovie';
import { MovieDiscoverPageSchema } from '../../code-parking/functions/schema/MovieDiscoverPageSchema';
import { ImagesSchema } from '../../code-parking/functions/schema/ImagesSchema';

export async function discover(query:string): Promise<[MovieDiscoverPageSchema | null, Error | null]> {
    let url = TMDB_BASE_URL + '/discover/movie?';
    const end = 'language=da-DK&watch_region=DK&include_adult=false';
    if (query) {
        url += query + '&' + end;
    } else {
        url += end;
    }
    try {
        const response = await fetch(url, requestInit());
        const movieDiscoverPageSchema: MovieDiscoverPageSchema = await response.json();
        if (response.ok) {
            return [movieDiscoverPageSchema, null];
        }
        return [null, new Error()];
    } catch (error) {
        return errorTupple(error);
    }
}

export async function getMovie(id: number): Promise<[IMovie | null, Error | null]> {
    const url = TMDB_BASE_URL + '/movie/' + id + '?language=da&region=dk&include_adult=false';
    try {
        const response = await fetch(url, requestInit());
        const json: IMovie = await response.json();
        if (response.ok) {
            return [json, null];
        }
        return [null, new Error()];
    } catch (error) {
        return errorTupple(error);
    }
}

export async function getMovieImages(id: number): Promise<[ImagesSchema | null, Error | null]> {
    const url = TMDB_BASE_URL + '/movie/' + id + '/images';
    try {
        const response = await fetch(url, requestInit());
        const json: ImagesSchema = await response.json();
        if (response.ok) {
            return [json, null];
        }
        return [null, new Error()];
    } catch (error) {
        return errorTupple(error);
    }
}

function errorTupple(error: Error): [null, Error] {
    const typeError: TypeError = error as TypeError;
    return [null, new Error(typeError.message)];
}

function requestInit(): Record<string, string | Record<string, string> | Headers | string[][]> {
    return {
        method: 'GET',
        headers: headersInit()
    }
}

function headersInit(): Headers | string[][] | Record<string, string> {
    return {
        Authorization: 'Bearer ' + TMDB_TOKEN,
        'Content-Type': 'application/json;charset=utf-8'
    }
}
