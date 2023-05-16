export interface IQuestion {
  response_code: number;
  results: IResultsEntity[];
}

export interface IResultsEntity {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: IAnswer[];
}

export interface IAnswer {
  isCorrect: boolean;
  value: string;
  isClicked: boolean;
}
