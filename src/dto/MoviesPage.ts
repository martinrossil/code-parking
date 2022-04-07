import IMovie from './IMovie';
import IMoviesPage from './IMoviesPage';

export default class MoviesPage implements IMoviesPage {
    public movies: Array<IMovie> = [];
    public page = NaN;
    public totalMovies = NaN;
    public totalPages = NaN;
}
