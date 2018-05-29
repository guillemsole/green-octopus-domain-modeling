import {expect} from 'chai';
import {Broadcast} from '../../src/model/Broadcast';
import {GameShow, GameShowState} from '../../src/model/GameShow';
import {fakeQuestion} from './FakeQuestion';
import {MonetaryPrize} from '../../src/model/MonetaryPrize';

describe('GameShow', () => {

    it('should be scheduled', () => {
        const scheduledDate = new Date();
        const gameShow = GameShow.schedule(scheduledDate, new MonetaryPrize(1000, '€'));
        expect(gameShow.scheduledDate).to.be.equal(scheduledDate);
        expect(gameShow.prize.text).to.be.equal('1000€');
        expect(gameShow.state).to.be.equal(GameShowState.SCHEDULED);
    });

    it('should add the required questions', () => {
        const gameShow = GameShow.schedule(new Date(), new MonetaryPrize(1000, '€'));
        const questions = [fakeQuestion()];

        gameShow.assignQuestions(questions);

        expect(gameShow.questions).to.be.equal(questions);
        expect(gameShow.state).to.be.equal(GameShowState.READY);
    });

    it('should rechedule game show', () => {
        const gameShow = GameShow.schedule(new Date(), new MonetaryPrize(1000, '€'));
        const questions = [fakeQuestion()];

        const rescheduleDate = new Date();
        gameShow.reschedule(rescheduleDate);

        expect(gameShow.scheduledDate).to.be.equal(rescheduleDate);
    });

    it('should open game', () => {
        const gameShow = GameShow.schedule(new Date(), new MonetaryPrize(1000, '€'));

        gameShow.assignQuestions([fakeQuestion()]);
        gameShow.open(new Broadcast('rtmp://greenoctopus.tech/live', 'wss://greenoctopus.tech/ws'));

        expect(gameShow.state).to.be.equal(GameShowState.OPENED);
    });

    it('should start game', () => {
        const gameShow = GameShow.schedule(new Date(), new MonetaryPrize(1000, '€'));

        gameShow.assignQuestions([fakeQuestion()]);
        gameShow.open(new Broadcast('rtmp://greenoctopus.tech/live', 'wss://greenoctopus.tech/ws'));
        gameShow.start();

        expect(gameShow.state).to.be.equal(GameShowState.RUNNING);
    });

    it('should provide the next question', () => {
        const gameShow = GameShow.schedule(new Date(), new MonetaryPrize(1000, '€'));
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
