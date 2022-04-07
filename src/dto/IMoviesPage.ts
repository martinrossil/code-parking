import IMovie from './IMovie';

export default interface IMoviesPage {
    movies: Array<IMovie>,
    page: number,
    totalMovies: number,
    totalPages: number
}
