
export class Answer {
    // TODO remove isCorrect
    // TODO add answerId.
    // TODO text translation Map ** DB to many relationship
    constructor(public readonly text: string,
                public readonly isCorrect: boolean) {
    }
}
