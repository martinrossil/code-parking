import { IState, Machine, State } from 'fuix';
import FilmDB from '../FilmDB';
import Factory from '../views/Factory';

export default class ResponsiveMachine extends Machine<FilmDB> {
    public constructor(host: FilmDB) {
        super(host);
        this.initial.addTransition('load', this.loadComplete);
        window.addEventListener('load', this.send, { once: true });
        window.addEventListener('resize', () => {
            this.send(new CustomEvent(this.getEventTypeFromWidth()));
        });
    }

    private _loadComplete!: IState;
    private get loadComplete(): IState {
        if (!this._loadComplete) {
            this._loadComplete = new State('LoadComplete');
            this._loadComplete.addTransition('mobile', this.mobile);
            this._loadComplete.addTransition('tablet', this.tablet);
            this._loadComplete.addTransition('computer', this.computer);
            this._loadComplete.on = this.onLoadComplete;
        }
        return this._loadComplete;
    }

    private _mobile!: IState;
    private get mobile(): IState {
        if (!this._mobile) {
            this._mobile = new State('Mobile');
            this._mobile.addTransition('tablet', this.tablet);
            this._mobile.addTransition('computer', this.computer);
            this._mobile.on = this.onMobile;
        }
        return this._mobile;
    }

    private _tablet!: IState;
    private get tablet(): IState {
        if (!this._tablet) {
            this._tablet = new State('Tablet');
            this._tablet.addTransition('mobile', this.mobile);
            this._tablet.addTransition('computer', this.computer);
            this._tablet.on = this.onTablet;
        }
        return this._tablet;
    }

    private _computer!: IState;
    private get computer(): IState {
        if (!this._computer) {
            this._computer = new State('Computer');
            this._computer.addTransition('mobile', this.mobile);
            this._computer.addTransition('tablet', this.tablet);
            this._computer.on = this.onComputer;
        }
        return this._computer;
    }

    private onComputer(): void {
        console.log('onComputer', this);
    }

    private onTablet(): void {
        console.log('onTablet', this);
    }

    private onMobile(): void {
        console.log('onMobile', this);
    }

    private onLoadComplete(): void {
        this.send(new CustomEvent(this.getEventTypeFromWidth()));
    }

    private getEventTypeFromWidth(): string {
        const width = Math.max(window.innerWidth, document.documentElement.clientWidth);
        if (width > 1024) {
            return 'computer';
        }
        if (width >= 768) {
            return 'tablet';
        }
        return 'mobile';
    }
}
