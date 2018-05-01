import {Answer} from '../../src/model/Answer';
import {Question, QuestionType} from '../../src/model/Question';

export const fakeQuestion = () => {
    const answers = [fakeAnswer(), fakeAnswer(), fakeAnswer()];
    return new Question(
        randomText(),
        answers,
        answers[0].id,
        QuestionType.GEOGRAPHY,
    );
};

const fakeAnswer = () => new Answer(randomText());

const randomText = () => Math.random().toString(36).substring(7);
