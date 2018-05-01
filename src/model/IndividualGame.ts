import {Answer} from './Answer';
import {GameShowId} from './GameShow';
import {Question} from './Question';
import {UserId} from './User';

export class IndividualGameId {
    constructor(public readonly userId: UserId,
                public readonly gameShowId: GameShowId) {

    }
}

export class IndividualGame {
    private readonly emptyExam: Map<Question, Answer> = new Map<Question, Answer>();

    constructor(public readonly individualGameId: IndividualGameId) {

    }

    answer(question: Question, answer: Answer) {
        // TODO: check question is current question running
        this.emptyExam.set(question, answer);
    }
}
