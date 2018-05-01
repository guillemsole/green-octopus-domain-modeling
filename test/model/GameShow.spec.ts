import {expect} from 'chai';
import {GameShow, GameShowState} from '../../src/model/GameShow';
import {Question} from '../../src/model/Question';

describe('GameShow', () => {

    it('should be scheduled', () => {
        const scheduledDate = new Date();
        const gameShow = GameShow.schedule(scheduledDate, 5000);
        expect(gameShow.scheduledDate).to.be.equal(scheduledDate);
        expect(gameShow.prize).to.be.equal(5000);
        expect(gameShow.state).to.be.equal(GameShowState.SCHEDULED);
    });

    it('should add the required questions', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const questions = [new Question('Sports')];

        gameShow.assignQuestions(questions);

        expect(gameShow.questions).to.be.equal(questions);
        expect(gameShow.state).to.be.equal(GameShowState.READY);
    });

    it('should allow change a question', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const firstQuestion = new Question('Geography');
        const secondQuestion = new Question('History');
        const questionToReplace = new Question('Sports');
        const questions = [firstQuestion, secondQuestion];

        gameShow.assignQuestions(questions);

        expect(gameShow.questions).to.be.equal(questions);

        gameShow.replaceQuestion(2, questionToReplace);

        expect(gameShow.questions).to.be.deep.equal([firstQuestion, questionToReplace]);
        expect(gameShow.questions).to.be.not.equal(questionToReplace);
    });
});
