import {Prize} from './Prize';

export class MonetaryPrize extends Prize {

    constructor(public readonly amount: number,
                public readonly currency: string) {
        super(amount + currency);

    }
    givePrizeAway(numWinners: number): string {
        return (this.amount / numWinners).toFixed(2) + this.currency;
    }
}
