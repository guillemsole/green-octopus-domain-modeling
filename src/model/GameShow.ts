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
                public readonly scheduledDate: Date,
                public readonly prize: number,
                private _state: GameShowState) {

    }

    static schedule(scheduledDate: Date, prize: number): GameShow {
        return new GameShow(Math.random() % 1000, scheduledDate, prize, GameShowState.SCHEDULED);
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

    open() {
        this._state = GameShowState.OPENED;
    }

    start() {
        this._state = GameShowState.RUNNING;
    }

    public join(user: User): IndividualGame | ViewerGame {
        if (this.state === GameShowState.OPENED) {
            return new IndividualGame(new IndividualGameId(user.id, this.id));
        } else if (this.state === GameShowState.RUNNING) {
            return new ViewerGame();
        } else {
            throw new Error('Cannot join a game if it has not started');
        }
    }
}
