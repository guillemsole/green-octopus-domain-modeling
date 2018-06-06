
export type AnswerId = number;

export class Answer {
    constructor(public readonly id: AnswerId,
                public readonly text: string) {
    }

    public static create(text: string): Answer {
        return new Answer(Math.random() % 1000, text);
    }
}
