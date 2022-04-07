/* eslint-disable */
import { getMovie } from '../../Tmdb';

export async function onRequest({params}): Promise<Response> {
    const uid: number = parseInt(params.uid);
    const [movie, error] = await getMovie(uid);
    let response = '[null, null]';
    
    if (movie) {
        response = JSON.stringify(movie, null, 4);
    }
    if (error) {
        response = JSON.stringify({ error: Error }, null, 4);
    }
    return new Response(response, {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*',
        }
    });
}
