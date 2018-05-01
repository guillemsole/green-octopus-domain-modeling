import {Answer} from '../../src/model/Answer';
import {Question, QuestionType} from '../../src/model/Question';

export const fakeQuestion = () => {
    const answers = [fakeAnswer(true), fakeAnswer(false), fakeAnswer(false)];
    return new Question(
        randomText(),
        answers,
        'Geography',
    );
};

const fakeAnswer = (isCorrect: boolean) => new Answer(randomText(isCorrect));

const randomText = () => Math.random().toString(36).substring(7);
