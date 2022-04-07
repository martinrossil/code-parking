import { IEventListener, IState, Machine, State } from 'enta';
import FilmDB from '../../../filmdb/src/FilmDB';

export default class RoutingMachine extends Machine<FilmDB> {
    public constructor(host: FilmDB) {
        super(host);
        this.initial.addTransition('URL_CHANGED', this.evaluateRoute);
        host.addEventListener('URL_CHANGED', this.send);
        host.addEventListener('NAVIGATED_TO_HOME', this.send);
    }

    private _evaluateRoute!: IState;
    private get evaluateRoute(): IState {
        if (!this._evaluateRoute) {
            this._evaluateRoute = new State('EvaluateRoute');
            this._evaluateRoute.addTransition('NAVIGATED_TO_HOME', this.homePage);
            this._evaluateRoute.on = this.onEvaluateRoute as IEventListener;
        }
        return this._evaluateRoute;
    }

    private onEvaluateRoute(e: CustomEvent<string>): void {
        console.log('onEvaluateRoute', e.type, e.detail);
        const url = e.detail;
        if (url === '/' || !url.startsWith('/film/')) {
            this.host.dispatch('NAVIGATED_TO_HOME', url);
        }
    }

    private _homePage!: IState;
    private get homePage(): IState {
        if (!this._homePage) {
            this._homePage = new State('HomePage');
            this._homePage.on = this.onHomePage;
        }
        return this._homePage;
    }

    private onHomePage(): void {
        console.log('onHomePage');
    }
}
