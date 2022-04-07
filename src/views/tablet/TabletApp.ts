import { DataContainer, DisplayContainer, IDataContainer, IDisplayContainer, VerticalLayout } from 'enta';
import Model from '../../state/Model';
import Colors from '../../theme/Colors';
import Shadows from '../../theme/Shadows';
import ILink from '../../vo/ILink';
import LinkRenderer from '../../components/LinkRenderer';

export default class TabletApp extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TabletApp';
        console.log('TabletApp');
        this.percentWidth = this.percentHeight = 100;
        this.addElements([this.topBar, this.sideBar]);
    }

    private _topBar!: IDisplayContainer;
    private get topBar(): IDisplayContainer {
        if (!this._topBar) {
            this._topBar = new DisplayContainer();
            this._topBar.height = 56;
            this._topBar.percentWidth = 100;
            this._topBar.zIndex = 1;
            this._topBar.backgroundColor = Colors.BLUE;
            this._topBar.addFilter(Shadows.BOX_SHADOW_DOWN_1);
            this._topBar.addFilter(Shadows.BOX_SHADOW_DOWN_2);
        }
        return this._topBar;
    }

    private _sideBar!: IDisplayContainer;
    private get sideBar(): IDisplayContainer {
        if (!this._sideBar) {
            this._sideBar = new DisplayContainer();
            this._sideBar.width = 72;
            this._sideBar.top = 56;
            this._sideBar.bottom = 0;
            this._sideBar.right = 0;
            this._sideBar.percentHeight = 100;
            this._sideBar.addFilter(Shadows.BOX_SHADOW_LEFT_1);
            this._sideBar.addFilter(Shadows.BOX_SHADOW_LEFT_2);
            this._sideBar.backgroundColor = Colors.BLUE;
        }
        return this._sideBar;
    }

    private _providersList!: IDataContainer<ILink>
    private get providersList(): IDataContainer<ILink> {
        if (!this._providersList) {
            this._providersList = new DataContainer();
            this._providersList.width = 144;
            this._providersList.percentHeight = 100;
            this._providersList.paddingTop = 64;
            this._providersList.paddingX = 8;
            this._providersList.backgroundColor = Colors.BLUE;
            this._providersList.layout = new VerticalLayout(8);
            this._providersList.DataRendererClass = LinkRenderer;
            this._providersList.dataProvider = Model.providers;
        }
        return this._providersList;
    }

    private _genresList!: IDataContainer<ILink>;
    private get genresList(): IDataContainer<ILink> {
        if (!this._genresList) {
            this._genresList = new DataContainer();
            this._genresList.width = 144;
            this._genresList.percentHeight = 100;
            this._genresList.right = 0;
            this._genresList.paddingTop = 64;
            this._genresList.paddingX = 8;
            this._genresList.backgroundColor = Colors.BLUE;
            this._genresList.layout = new VerticalLayout(8);
            this._genresList.DataRendererClass = LinkRenderer;
            this._genresList.dataProvider = Model.genres;
        }
        return this._genresList;
    }
}
customElements.define('tablet-app', TabletApp);
