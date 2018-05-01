import {GameShowId} from './GameShow';
import {QuestionId} from './Question';
import {UserId} from './User';

export class IndividualGameId {
    constructor(public readonly userId: UserId,
                public readonly gameShowId: GameShowId) {

    }
}

export class IndividualGame {
    private readonly emptyExam: Map<QuestionId, number> = new Map<QuestionId, number>();

    constructor(public readonly individualGameId: IndividualGameId) {

    }

    answer(questionId: QuestionId, answerIndex: number) {
        this.emptyExam.set(questionId, answerIndex);
    }
}
