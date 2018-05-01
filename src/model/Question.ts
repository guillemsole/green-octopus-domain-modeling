import {Answer, AnswerId} from './Answer';

export enum QuestionType {
    GEOGRAPHY,
    HISTORY,
    SPORTS,
}

export class Question {
    constructor(public readonly statement: string,
                public readonly answers: Answer[],
                public readonly correctAnswerId: AnswerId,
                public readonly questionType: QuestionType) {}

}
