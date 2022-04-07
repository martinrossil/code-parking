/* eslint-disable */
import { ImageSchema } from '../../../schema/ImageSchema';
import { getMovieImages } from '../../../Tmdb';

 export async function onRequest({params, env}): Promise<Response> {
    const BASE_URL = 'https://image.tmdb.org/t/p/w300/';
    const uid: string = params.uid;
    const BACKDROP_PATHS = env.BACKDROP_PATHS;
    const path: string | null = await BACKDROP_PATHS.get(uid);

    if (path) {
        const URL = BASE_URL + path;
        return fetch(URL);
    }

    const id = parseInt(uid, 16);
    const [movieImages, error] = await getMovieImages(id);
    if (movieImages) {
        if (movieImages.backdrops.length) {
            const backdrop: ImageSchema = movieImages.backdrops[0];
            const path = backdrop.file_path;
            const ONE_DAY = 60 * 60 * 24;
            await BACKDROP_PATHS.put(uid, path, { expirationTtl: ONE_DAY })
            const URL = BASE_URL + path;
            return fetch(URL);
        }
    }
    return getNotFound();
}

function getNotFound(): Response {
    return new Response('', {
        status: 404,
        headers: {
            'Cache-Control': 'public, max-age=0',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
