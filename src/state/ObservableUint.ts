import { EventDispatcher } from 'fuix';

export default class OberservableUint extends EventDispatcher {
    public constructor(value = 0) {
        super();
        this._value = value;
    }

    private _value;

    public set value(value: number) {
        if (isNaN(value)) {
            if (this._value !== 0) {
                this._value = 0;
                this.notify();
            }
            return;
        }
        if (value < 0) {
            if (this._value !== 0) {
                this._value = 0;
                this.notify();
            }
            return;
        }
        const uint = Math.round(value);
        if (this._value !== uint) {
            this._value = uint;
            this.notify();
        }
    }

    public get value(): number {
        return this._value;
    }

    private notify(): void {
        this.dispatchCustomEvent(new CustomEvent('changed', { detail: this.value }));
    }
}
