import {GameShow} from './GameShow';
import {Player} from './Player';

export class UserId {
    constructor(public readonly countryCode: string,
                public readonly phoneNumber: string) {
    }

    equal(other: UserId): boolean {
        return other.countryCode === this.countryCode && other.phoneNumber === this.phoneNumber;
    }
}

export class User {

    constructor(public readonly id: UserId) {
    }

    public join(gameShow: GameShow): Player {
        // TODO: Return Viewer in case the GameShow is already RUNNING
        const individualGame = gameShow.join(this);
        return new Player(this.id, individualGame);
    }

    equal(other: User): boolean {
        return other.id.equal(this.id);
    }
}
