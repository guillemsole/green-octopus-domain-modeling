import {Answer, AnswerId} from './Answer';

export enum QuestionState {
    CREATED,
}

export type QuestionId = number;

export class Question {

    constructor(public readonly id: QuestionId,
                public readonly statement: string,
                public readonly answers: Answer[],
                public readonly questionType: string,
                public readonly state: QuestionState) {}

    public static create(statement: string, answers: Answer[], questionType: QuestionType) {
        if (answers.filter((answer) => answer.isCorrect).length !== 1) {
            throw new Error('Question should have one correct answer');
        }
        return new Question(Math.random() % 1000, statement, answers, questionType, QuestionState.CREATED);
    }

    public correctAnswer(): Answer {
        return this.answers.filter((answer) => answer.isCorrect)[0];
    }
}
