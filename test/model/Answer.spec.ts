import {expect} from 'chai';
import {Answer} from '../../src/model/Answer';

describe('Answer', () => {
    it('should create a new answer', () => {
        const text = 'This is an answer';
        const answer = new Answer(text, true);
        expect(answer.text).to.be.equals(text);
        expect(answer.isCorrect).to.be.equal(true);
    });
});
