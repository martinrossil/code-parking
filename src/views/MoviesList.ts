import { ColumnLayout, DataContainer } from 'enta';
import IMovie from '../dto/IMovie';
import Model from '../state/Model';
import MovieItemRenderer from '../components/MovieItemRenderer';

export default class MoviesList extends DataContainer<IMovie> {
    public constructor() {
        super();
        this.percentWidth = this.percentHeight = 100;
        this.DataRendererClass = MovieItemRenderer;
        this.dataProvider = Model.movies;
        this.padding = 16;
        this.paddingTop = 88;
        this.left = 192;
        this.right = 192;
        this.layout = new ColumnLayout(160, 5, 16);
    }
}
customElements.define('movies-list', MoviesList);
