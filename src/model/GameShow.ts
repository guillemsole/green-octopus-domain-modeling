import {IndividualGame, IndividualGameId} from './IndividualGame';
import {Question} from './Question';
import {User} from './User';
import {ViewerGame} from './ViewerGame';

export enum GameShowState {
    SCHEDULED,
    READY,
    OPENED,
    RUNNING,
    PAUSED,
    CANCELED,
    FINISHED,
}

export type GameShowId = number;

export class GameShow {
    private _questions: Question[];
    private questionPosition = 0;

    constructor(public readonly id: GameShowId,
                public readonly prize: number,
                private _scheduledDate: Date,
                private _state: GameShowState) {

    }

    static schedule(scheduledDate: Date, prize: number): GameShow {
        return new GameShow(Math.random() % 1000, prize, scheduledDate, GameShowState.SCHEDULED);
    }

    assignQuestions(questions: Question[]): void {
        this._questions = questions;
        this._state = GameShowState.READY;
    }

    reschedule(scheduledDate: Date): void {
        // TODO should throw in some status.
        this._scheduledDate = scheduledDate;
    }

    get questions(): Question[] {
        return this._questions;
    }

    get state(): GameShowState {
        return this._state;
    }

    get scheduledDate(): Date {
        return this._scheduledDate;
    }

    replaceQuestion(position: number, questionToReplace: Question): void {
        this._questions[position - 1] = questionToReplace;
    }

    nextQuestion(): Question {
        if (this.state !== GameShowState.RUNNING) {
            throw new Error('GameShow has not started yet');
        }
        // TODO: test last question has status answered
        return this._questions[this.questionPosition++];
    }

    open(): void {
        this._state = GameShowState.OPENED;
    }

    start(): void {
        this._state = GameShowState.RUNNING;
    }

    public join(user: User): IndividualGame {
        if (this.state === GameShowState.OPENED) {
            return new IndividualGame(new IndividualGameId(user.id, this.id));
        } else if (this.state === GameShowState.RUNNING) {
            throw new Error('Cannot join a game if it is running');
        } else {
            throw new Error('Cannot join a game if it has not started');
        }
    }
}
