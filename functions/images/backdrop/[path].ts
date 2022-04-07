/* eslint-disable */
/**
 * backdrop sizes
 * w300 w780 w1280 original
 */
export async function onRequest({request, params}): Promise<Response> {
    const URL = 'https://image.tmdb.org/t/p/w300/' + params.path + '.jpg';
    return fetch(URL);
}
