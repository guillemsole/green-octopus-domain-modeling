import {expect} from 'chai';
import {Answer} from '../../src/model/Answer';
import {Question, QuestionState} from '../../src/model/Question';

describe('Question', () => {

    it('should create a Question with one correct answer', () => {
        const answers = [new Answer('Answer 1', false), new Answer('Answer 2', true)];
        const question = Question.create('Statement', answers, 'Geography');

        expect(question.statement).to.be.equal('Statement');
        expect(question.answers).to.be.deep.equal(answers);
        expect(question.state).to.be.equal(QuestionState.CREATED);
    });

    it('should throw when there are no answers', () => {
        expect(() => {
            Question.create('Statement', [], 'Geography');
        }).to.throw(Error);
    });

    it('should throw when there are no correct answers', () => {
        expect(() => {
            Question.create('Statement', [new Answer('Answer 1', false), new Answer('Answer 2', false)], 'Geography');
        }).to.throw(Error);
    });

    it('should throw when there are more than one correct answer', () => {
        expect(() => {
            Question.create('Statement', [new Answer('Answer 1', true), new Answer('Answer 2', true)], 'Geography');
        }).to.throw(Error);
    });
});
