import {GameShow} from './GameShow';
import {IndividualGame} from './IndividualGame';
import {QuestionId} from './Question';
import {UserId} from './User';

export class Player {
    constructor(public readonly userId: UserId,
                public readonly playingIn: IndividualGame) {
        if (!playingIn.individualGameId.userId.equal(userId)) {
            throw new Error('IndividualGame id must be same id as me');
        }
    }

    isPlayingIn(gameShow: GameShow) {
        return this.playingIn.individualGameId.gameShowId === gameShow.id;
    }

    answer(questionId: QuestionId, answerIndex: number) {
        this.playingIn.answer(questionId, answerIndex);
    }
}
