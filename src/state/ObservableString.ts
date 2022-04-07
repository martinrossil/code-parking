import { EventDispatcher } from 'fuix';

export default class OberservableString extends EventDispatcher {
    public constructor(value = '') {
        super();
        this._value = value;
    }

    private _value;

    public set value(value: string) {
        if (this._value !== value) {
            this._value = value;
            this.notify();
        }
    }

    public get value(): string {
        return this._value;
    }

    private notify(): void {
        this.dispatchCustomEvent(new CustomEvent('changed', { detail: this.value }));
    }
}
