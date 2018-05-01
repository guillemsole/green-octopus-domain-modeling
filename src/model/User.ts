import {GameShow} from './GameShow';
import {IndividualGame} from './IndividualGame';
import {Player} from './Player';
import {Viewer} from './Viewer';

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

    public join(gameShow: GameShow): Player | Viewer {
        const game = gameShow.join(this);
        if (game instanceof IndividualGame) {
            return new Player(this.id, game);
        } else {
            return new Viewer(gameShow.id);
        }
    }

    equal(other: User): boolean {
        return other.id.equal(this.id);
    }
}
