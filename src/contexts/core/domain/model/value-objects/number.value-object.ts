export class NumberValueObject {
    protected readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    public toNumber(): number {
        return this.value;
    }
}
