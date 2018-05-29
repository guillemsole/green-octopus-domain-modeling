
export abstract class Prize {
    protected constructor(public readonly text: string) {

    }

    public abstract givePrizeAway(numWinners: number): string;
}