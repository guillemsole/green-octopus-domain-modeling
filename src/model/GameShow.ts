import {Question} from './Question';

export enum GameShowState {
    SCHEDULED,
    READY,
    RUNNING,
    FINISHED,
    RESUMED,
    CANCELED,
}

export class GameShow {
    private _questions: Question[];
    private questionPosition = 0;

    constructor(public readonly scheduledDate: Date,
                public readonly prize: number,
                private _state: GameShowState) {

    }

    static schedule(scheduledDate: Date, prize: number): GameShow {
        return new GameShow(scheduledDate, prize, GameShowState.SCHEDULED);
    }

    assignQuestions(questions: Question[]): void {
        this._questions = questions;
        this._state = GameShowState.READY;
    }

    get questions(): Question[] {
        return this._questions;
    }

    get state(): GameShowState {
        return this._state;
    }

    replaceQuestion(position: number, questionToReplace: Question) {
        this._questions[position - 1] = questionToReplace;
    }

    nextQuestion() {
        if (this.state !== GameShowState.RUNNING) {
            throw new Error('GameShow has not started yet');
        }
        return this._questions[this.questionPosition++];
    }

    start() {
        this._state = GameShowState.RUNNING;
    }
}
