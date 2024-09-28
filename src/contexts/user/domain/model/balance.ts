export class Balance {
    constructor(
        private _galleons: number,
        private _sickles: number,
        private _knuts: number,
    ) {}

    get galleons(): number {
        return this._galleons;
    }

    set galleons(value: number) {
        this._galleons = value;
    }

    get sickles(): number {
        return this._sickles;
    }

    set sickles(value: number) {
        this._sickles = value;
    }

    get knuts(): number {
        return this._knuts;
    }

    set knuts(value: number) {
        this._knuts = value;
    }
}
