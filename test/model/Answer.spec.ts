import {expect} from 'chai';
import {Answer} from '../../src/model/Answer';

describe('Answer', () => {
    it('should create a new answer', () => {
        const text = 'This is an answer';
        const answer = Answer.create(text);
        expect(answer.text).to.be.equals(text);
    });
});
