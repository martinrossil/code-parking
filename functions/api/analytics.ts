/* eslint-disable */
export async function onRequest({request}): Promise<Response> {
    const headers = [];
    request.headers.forEach((value, key) => {
        headers.push({ key, value });
    });
    const { cf } = request;
    return new Response(JSON.stringify({ 
        headers,
        cf
    }, null, 4))
};
