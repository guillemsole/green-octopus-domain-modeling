import { Broadcast } from './Broadcast';
import { IndividualGame, IndividualGameId } from './IndividualGame';
import { User } from './User';

export enum ShowState {
    CREATED,
    SCHEDULED,
    READY,
    OPENED,
    RUNNING,
    PAUSED,
    CANCELED,
    FINISHED,
}

export type ShowId = number;

export interface Schedulable {
    schedule: (date: Date) => void;
    reschedule: (date: Date) => void;
    open: (broadcast: Broadcast) => void;
    start: () => void;
}

export class Show implements Schedulable {
    protected _scheduledDate: Date;
    public readonly id: ShowId;
    protected _state: ShowState;
    protected _broadcast: Broadcast;

    constructor() {
        this.id = Math.random() % 1000;
    }

    reschedule(scheduledDate: Date): void {
        // TODO should throw in some status.
        this._scheduledDate = scheduledDate;
    }

    public schedule(scheduledDate: Date): void {
        // TODO should throw in some status.
        this._scheduledDate = scheduledDate;
        this._state = ShowState.SCHEDULED;
    }

    get scheduledDate(): Date {
        return this._scheduledDate;
    }

    // TODO Push?
    open(broadcast: Broadcast): void {
        this._broadcast = broadcast;
        this._state = ShowState.OPENED;
    }

    start(): void {
        this._state = ShowState.RUNNING;
    }

    get broadcast(): Broadcast {
        if (this._state !== ShowState.OPENED && this._state !== ShowState.RUNNING) {
            throw new Error('Game show is not available');
        }
        return this.broadcast;
    }

    get state(): ShowState {
        return this._state;
    }

    // TODO make general class for IndividualGame (IndividualStream?)
    public join(user: User): IndividualGame {
        if (this._state === ShowState.OPENED) {
            return new IndividualGame(new IndividualGameId(user.id, this.id));
        } else if (this._state === ShowState.RUNNING) {
            throw new Error('Cannot join a show if it is running');
        } else {
            throw new Error('Cannot join a show if it has not started');
        }
    }
}
