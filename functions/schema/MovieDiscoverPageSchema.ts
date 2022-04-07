/* eslint-disable camelcase */
import { MovieDiscoverSchema } from './MovieDiscoverSchema';

export type MovieDiscoverPageSchema = {
    page: number,
    results: Array<MovieDiscoverSchema>,
    total_results: number,
    total_pages: number
}
