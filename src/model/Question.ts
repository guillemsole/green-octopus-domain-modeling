import {Answer} from './Answer';

export enum QuestionState {
    CREATED,
}

export type QuestionId = number;

export class Question {

    constructor(public readonly id: QuestionId,
                public readonly statement: string,
                public readonly answers: Answer[],
                public readonly questionTags: string) {}

    public static create(statement: string, answers: Answer[], questionTags: string) {
        if (answers.filter((answer) => answer.isCorrect).length !== 1) {
            throw new Error('Question should have one correct answer');
        }
        return new Question(Math.random() % 1000, statement, answers, questionTags);
    }

    public correctAnswer(): Answer {
        return this.answers.filter((answer) => answer.isCorrect)[0];
    }
}
