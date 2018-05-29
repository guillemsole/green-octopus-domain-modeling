import {Answer} from './Answer';

export type QuestionId = number;

export class Question {
    // DB we store answer id
    constructor(public readonly id: QuestionId,
                public readonly statement: Map<string, string>,
                public readonly answers: Answer[],
                public readonly correctAnswer: Answer,
                public readonly questionTags: string,
                public readonly source?: string) {}

    public static Builder() {
        return new QuestionBuilder();
    }
}

class QuestionBuilder {
    private readonly id: QuestionId;
    private statement: Map<string, string>;
    private answers: Answer[] = [];
    private correctAnswer: Answer;
    private questionTags: string;
    private source?: string;

    constructor() {
        this.id = Math.random() % 1000;
    }

    public addStatement(statement: Map<string, string>): QuestionBuilder {
        this.statement = statement;
        return this;
    }

    public addAnswer(answer: Answer): QuestionBuilder {
        this.answers.push(answer);
        return this;
    }

    public addCorrectAnswer(answer: Answer): QuestionBuilder {
        this.answers.push(answer);
        this.correctAnswer = answer;
        return this;
    }

    public addQuestionTags(tags: string): QuestionBuilder {
        this.questionTags = tags;
        return this;
    }

    public addSource(source: string): QuestionBuilder {
        this.source = source;
        return this;
    }

    public build(): Question {
        if (!this.correctAnswer) {
            throw new Error('Question should have a correct answer');
        }
        if (!this.statement) {
            throw new Error('Question must include an statement');
        }
        if (!this.questionTags) {
            throw new Error('Question must include question tags');
        }

        // Validate all params are included
        return new Question(this.id, this.statement, this.answers, this.correctAnswer, this.questionTags, this.source);
    }
}
