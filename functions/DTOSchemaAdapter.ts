import { MovieDiscoverPageSchema } from '../../code-parking/functions/schema/MovieDiscoverPageSchema';
import IMoviesPage from '../src/dto/IMoviesPage';
import MoviesPage from '../src/dto/MoviesPage';
import { MovieDiscoverSchema } from '../../code-parking/functions/schema/MovieDiscoverSchema';
import IMovie from '../src/dto/IMovie';
import Movie from '../src/dto/Movie';

export function movieDiscoverPageSchemaToMoviesPage(schema: MovieDiscoverPageSchema): IMoviesPage {
    const moviesPage: IMoviesPage = new MoviesPage();
    for (const movieDiscoverSchema of schema.results) {
        moviesPage.movies.push(movieDiscoverSchemaToMovie(movieDiscoverSchema));
    }
    moviesPage.page = schema.page;
    moviesPage.totalMovies = schema.total_results;
    moviesPage.totalPages = schema.total_pages;
    return moviesPage;
}

function movieDiscoverSchemaToMovie(schema: MovieDiscoverSchema): IMovie {
    const movie: IMovie = new Movie();
    movie.uid = schema.id.toString(16);
    movie.title = schema.title;
    return movie;
}
