import {expect} from 'chai';
import {GameShow, GameShowState} from '../../src/model/GameShow';
import {fakeQuestion} from './FakeQuestion';

describe('GameShow', () => {

    it('should be scheduled', () => {
        const scheduledDate = new Date();
        // TODO Make Prize object and subclasses (MonetaryPrize, LivesPrize....)
        const gameShow = GameShow.schedule(scheduledDate, 5000);
        expect(gameShow.scheduledDate).to.be.equal(scheduledDate);
        expect(gameShow.prize).to.be.equal(5000);
        expect(gameShow.state).to.be.equal(GameShowState.SCHEDULED);
    });

    it('should add the required questions', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const questions = [fakeQuestion()];

        gameShow.assignQuestions(questions);

        expect(gameShow.questions).to.be.equal(questions);
        expect(gameShow.state).to.be.equal(GameShowState.READY);
    });

    it('should rechedule game show', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const questions = [fakeQuestion()];

        const rescheduleDate = new Date();
        gameShow.reschedule(rescheduleDate);

        expect(gameShow.scheduledDate).to.be.equal(rescheduleDate);
    });

    it('should allow change a question', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const firstQuestion = fakeQuestion();
        const secondQuestion = fakeQuestion();
        const questionToReplace = fakeQuestion();
        const questions = [firstQuestion, secondQuestion];

        gameShow.assignQuestions(questions);

        expect(gameShow.questions).to.be.equal(questions);
        gameShow.replaceQuestion(2, questionToReplace);

        expect(gameShow.questions).to.be.deep.equal([firstQuestion, questionToReplace]);
        expect(gameShow.questions).to.be.not.equal(questionToReplace);
    });

    it('should open game', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);

        gameShow.assignQuestions([fakeQuestion()]);
        gameShow.open();

        expect(gameShow.state).to.be.equal(GameShowState.OPENED);
    });

    it('should start game', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);

        gameShow.assignQuestions([fakeQuestion()]);
        gameShow.open();
        gameShow.start();

        expect(gameShow.state).to.be.equal(GameShowState.RUNNING);
    });

    it('should provide the next question', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const firstQuestion = fakeQuestion();
        const secondQuestion = fakeQuestion();
        const thirdQuestion = fakeQuestion();
        const questions = [firstQuestion, secondQuestion, thirdQuestion];

        gameShow.assignQuestions(questions);
        gameShow.start();

        expect(gameShow.nextQuestion()).to.be.equal(firstQuestion);
        expect(gameShow.nextQuestion()).to.be.equal(secondQuestion);
    });
});
