import ComputerApp from './computer/ComputerApp';
import MobileApp from './mobile/MobileApp';
import TabletApp from './tablet/TabletApp';

export default class Factory {
    private static _mobileApp: MobileApp;
    public static get mobileApp(): MobileApp {
        if (!this._mobileApp) {
            this._mobileApp = new MobileApp();
        }
        return this._mobileApp;
    }

    private static _tabletApp: TabletApp;
    public static get tabletApp(): TabletApp {
        if (!this._tabletApp) {
            this._tabletApp = new TabletApp();
        }
        return this._tabletApp;
    }

    private static _computerApp: ComputerApp;
    public static get computerApp(): ComputerApp {
        if (!this._computerApp) {
            this._computerApp = new ComputerApp();
        }
        return this._computerApp;
    }
}
