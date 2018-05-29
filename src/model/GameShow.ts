import {Broadcast} from './Broadcast';
import {IndividualGame, IndividualGameId} from './IndividualGame';
import {Question} from './Question';
import {User} from './User';
import {Prize} from './Prize';
import { Show, ShowState } from './Show';

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

export class GameShow extends Show {
    private _questions: Question[];
    private questionPosition = 0;

    constructor(public readonly prize: Prize) {
                super();
    }

    // static schedule(scheduledDate: Date, prize: Prize): GameShow {
    //    return new GameShow(Math.random() % 1000, prize, scheduledDate, GameShowState.SCHEDULED);
    // }

    // TODO check order of questions (can we save it to DB?)
    assignQuestions(questions: Question[]): void {
        this._questions = questions;
        this._state = ShowState.READY;
    }

    reschedule(scheduledDate: Date): void {
        // TODO should throw in some status.
        this._scheduledDate = scheduledDate;
    }

    get questions(): Question[] {
        return this._questions;
    }

    nextQuestion(): Question {
        if (this._state !== ShowState.RUNNING) {
            throw new Error('GameShow has not started yet');
        }
        // TODO: test last question has status answered
        return this._questions[this.questionPosition++];
    }
}
