
export type AnswerId = number;

export class Answer {
    // TODO DB to many relationship
    constructor(public readonly id: AnswerId,
                public readonly text: Map<string, string>) {
    }

    public static create(text: Map<string, string>): Answer {
        return new Answer(Math.random() % 1000, text);
    }
}
