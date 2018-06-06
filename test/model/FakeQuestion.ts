import {Answer} from '../../src/model/Answer';
import {Question} from '../../src/model/Question';

export const fakeQuestion = () => {
    return Question.Builder()
        .addStatement(randomText())
        .addAnswer(fakeAnswer())
        .addCorrectAnswer(fakeAnswer())
        .addQuestionTags('history')
        .addSource('https://greenoctopus.tech')
        .build();
};

const fakeAnswer = () => Answer.create(randomText());

const randomText = () => Math.random().toString(36).substring(7);
