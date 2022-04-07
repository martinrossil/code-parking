import { DisplayContainer, IDisplayContainer } from 'enta';
import Colors from '../../theme/Colors';
import Shadows from '../../theme/Shadows';

export default class MobileApp extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MobileApp';
        console.log('MobileApp');
        this.percentWidth = this.percentHeight = 100;
        this.addElements([this.topBar, this.bottomBar]);
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

    private _bottomBar!: IDisplayContainer;
    private get bottomBar(): IDisplayContainer {
        if (!this._bottomBar) {
            this._bottomBar = new DisplayContainer();
            this._bottomBar.height = 56;
            this._bottomBar.percentWidth = 100;
            this._bottomBar.zIndex = 2;
            this._bottomBar.bottom = 0;
            this._bottomBar.backgroundColor = Colors.BLUE;
            this._bottomBar.addFilter(Shadows.BOX_SHADOW_UP_1);
            this._bottomBar.addFilter(Shadows.BOX_SHADOW_UP_2);
        }
        return this._bottomBar;
    }
}
customElements.define('mobile-app', MobileApp);
