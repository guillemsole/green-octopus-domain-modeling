import {expect} from 'chai';
import {Broadcast} from '../../src/model/Broadcast';
import {GameShow} from '../../src/model/GameShow';
import {ShowState} from '../../src/model/Show';
import {fakeQuestion} from './FakeQuestion';

describe('GameShow', () => {

    it('should be scheduled', () => {
        const scheduledDate = new Date();
        const gameShow = new GameShow(5000);
        gameShow.schedule(scheduledDate);
        // TODO Make Prize object and subclasses (MonetaryPrize, LivesPrize....)
        expect(gameShow.scheduledDate).to.be.equal(scheduledDate);
        expect(gameShow.prize).to.be.equal(5000);
        expect(gameShow.state).to.be.equal(ShowState.SCHEDULED);
    });

    it('should add the required questions', () => {
        const gameShow = new GameShow(5000);
        gameShow.schedule(new Date());
        const questions = [fakeQuestion()];

        gameShow.assignQuestions(questions);

        expect(gameShow.questions).to.be.equal(questions);
        expect(gameShow.state).to.be.equal(ShowState.READY);
    });

    it('should rechedule game show', () => {
        const gameShow = new GameShow(5000);
        gameShow.schedule(new Date());
        const questions = [fakeQuestion()];

        const rescheduleDate = new Date();
        gameShow.reschedule(rescheduleDate);

        expect(gameShow.scheduledDate).to.be.equal(rescheduleDate);
    });

    it('should open game', () => {
        const gameShow = new GameShow(5000);
        gameShow.schedule(new Date());

        gameShow.assignQuestions([fakeQuestion()]);
        gameShow.open(new Broadcast('rtmp://greenoctopus.tech/live', 'wss://greenoctopus.tech/ws'));

        expect(gameShow.state).to.be.equal(ShowState.OPENED);
    });

    it('should start game', () => {
        const gameShow = new GameShow(5000);
        gameShow.schedule(new Date());

        gameShow.assignQuestions([fakeQuestion()]);
        gameShow.open(new Broadcast('rtmp://greenoctopus.tech/live', 'wss://greenoctopus.tech/ws'));
        gameShow.start();

        expect(gameShow.state).to.be.equal(ShowState.RUNNING);
    });

    it('should provide the next question', () => {
        const gameShow = new GameShow(5000);
        gameShow.schedule(new Date());
        const firstQuestion = fakeQuestion();
        const secondQuestion = fakeQuestion();
        const thirdQuestion = fakeQuestion();
        const questions = [firstQuestion, secondQuestion, thirdQuestion];

        gameShow.assignQuestions(questions);
        gameShow.open(new Broadcast('rtmp://greenoctopus.tech/live', 'wss://greenoctopus.tech/ws'));
        gameShow.start();

        expect(gameShow.nextQuestion()).to.be.equal(firstQuestion);
        expect(gameShow.nextQuestion()).to.be.equal(secondQuestion);
    });
});
