export interface Question {
  response_code: number;
  results: ResultsEntity[];
}

export interface ResultsEntity {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: Answer[];
}

export interface Answer {
  isCorrect: boolean;
  value: string;
  isClicked: boolean;
}
