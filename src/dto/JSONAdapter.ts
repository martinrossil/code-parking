import IMovie from './IMovie';
import IMoviesPage from './IMoviesPage';
import Movie from './Movie';
import MoviesPage from './MoviesPage';

export function moviesPageJSONToMoviesPage(json: IMoviesPage): IMoviesPage {
    const moviesPage: IMoviesPage = new MoviesPage();
    for (const movieJSON of json['movies']) {
        moviesPage.movies.push(movieJSONToMovie(movieJSON));
    }
    moviesPage.page = json['page'];
    moviesPage.totalMovies = json['totalMovies'];
    moviesPage.totalPages = json['totalPages'];
    return moviesPage;
}

function movieJSONToMovie(json: IMovie): IMovie {
    const movie: IMovie = new Movie();
    movie.uid = json['uid'];
    movie.title = json['title'];
    return movie;
}
