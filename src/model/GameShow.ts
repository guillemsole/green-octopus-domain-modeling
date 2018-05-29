import {Broadcast} from './Broadcast';
import {IndividualGame, IndividualGameId} from './IndividualGame';
import {Question} from './Question';
import {User} from './User';
import {Prize} from './Prize';

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
    private _broadcast: Broadcast;

    constructor(public readonly id: GameShowId,
                public readonly prize: Prize,
                private _scheduledDate: Date,
                private _state: GameShowState) {

    }

    static schedule(scheduledDate: Date, prize: Prize): GameShow {
        return new GameShow(Math.random() % 1000, prize, scheduledDate, GameShowState.SCHEDULED);
    }

    // TODO check order of questions (can we save it to DB?)
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

    get broadcast(): Broadcast {
        if (this._state !== GameShowState.OPENED && this._state !== GameShowState.RUNNING) {
            throw new Error('Game show is not available');
        }
        return this.broadcast;
    }

    nextQuestion(): Question {
        if (this._state !== GameShowState.RUNNING) {
            throw new Error('GameShow has not started yet');
        }
        // TODO: test last question has status answered
        return this._questions[this.questionPosition++];
    }

    // TODO Push?
    open(broadcast: Broadcast): void {
        this._broadcast = broadcast;
        this._state = GameShowState.OPENED;
    }

    start(): void {
        this._state = GameShowState.RUNNING;
    }

    public join(user: User): IndividualGame {
        if (this._state === GameShowState.OPENED) {
            return new IndividualGame(new IndividualGameId(user.id, this.id));
        } else if (this._state === GameShowState.RUNNING) {
            throw new Error('Cannot join a game if it is running');
        } else {
            throw new Error('Cannot join a game if it has not started');
        }
    }
}
