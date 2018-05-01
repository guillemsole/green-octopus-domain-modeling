import {GameShow} from './GameShow';
import {UserId} from './User';

export class Player {
    constructor(public readonly userId: UserId,
                public readonly playingIn: GameShow) {
    }
}
