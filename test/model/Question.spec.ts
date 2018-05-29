import {expect} from 'chai';
import {Answer} from '../../src/model/Answer';
import {Question} from '../../src/model/Question';

describe('Question', () => {

    it('should create a Question with one correct answer', () => {
        const answer = Answer.create(new Map([['en', 'Answer 1']]));
        const correctAnswer = Answer.create(new Map([['en', 'Answer 2']]));
        const question = Question.Builder()
            .addStatement(new Map([['en', 'Statement']]))
            .addAnswer(answer)
            .addCorrectAnswer(correctAnswer)
            .addQuestionTags('history')
            .build();

        expect(question.statement.get('en')).to.be.equal('Statement');
        expect(question.correctAnswer).to.be.deep.equal(correctAnswer);
        expect(question.questionTags).to.be.equal('history');
    });

    it('should throw when there are no answers', () => {
        expect(() => {
            Question.Builder()
                .addStatement(new Map([['en', 'Statement']]))
                .addQuestionTags('history')
                .build();
        }).to.throw(Error);
    });

    it('should throw when there are no correct answers', () => {
        expect(() => {
            Question.Builder()
                .addStatement(new Map([['en', 'Statement']]))
                .addAnswer(Answer.create(new Map([['en', 'Answer 1']])))
                .addAnswer(Answer.create(new Map([['en', 'Answer 2']])))
                .addQuestionTags('history')
                .build();
        }).to.throw(Error);
    });

    it('should throw when this is no statement', () => {
        expect(() => {
            Question.Builder()
                .addAnswer(Answer.create(new Map([['en', 'Answer 1']])))
                .addCorrectAnswer(Answer.create(new Map([['en', 'Answer 2']])))
                .addQuestionTags('history')
                .build();
        }).to.throw(Error);
    });

    it('should throw when this is no tags', () => {
        expect(() => {
            Question.Builder()
                .addStatement(new Map([['en', 'Statement']]))
                .addAnswer(Answer.create(new Map([['en', 'Answer 1']])))
                .addCorrectAnswer(Answer.create(new Map([['en', 'Answer 2']])))
                .build();
        }).to.throw(Error);
    });
});
