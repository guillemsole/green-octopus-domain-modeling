import {Answer} from '../../src/model/Answer';
import {Question} from '../../src/model/Question';

export const fakeQuestion = () => {
    return Question.Builder()
        .addStatement(new Map<string, string>().set('en', randomText()))
        .addAnswer(fakeAnswer())
        .addCorrectAnswer(fakeAnswer())
        .addQuestionTags('history')
        .addSource('https://greenoctopus.tech')
        .build();
};

const fakeAnswer = () => Answer.create(new Map<string, string>().set('en', randomText()));

const randomText = () => Math.random().toString(36).substring(7);
