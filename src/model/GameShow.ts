import {Broadcast} from './Broadcast';
import {IndividualGame, IndividualGameId} from './IndividualGame';
import {Prize} from './Prize';
import {Question} from './Question';
import { Show, ShowState } from './Show';
import {User} from './User';

export class GameShow extends Show {
    private _questions: Question[];
    private questionPosition = 0;

    constructor(public readonly prize: Prize) {
                super();
                this._state = ShowState.CREATED;
    }

    // static schedule(scheduledDate: Date, prize: Prize): GameShow {
    //    return new GameShow(Math.random() % 1000, prize, scheduledDate, GameShowState.SCHEDULED);
    // }

    // TODO check order of questions (can we save it to DB?)
    assignQuestions(questions: Question[]): void {
        this._questions = questions;
        this._state = ShowState.READY;
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
