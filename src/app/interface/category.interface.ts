export interface Category {
  trivia_categories: TriviaCategoriesEntity[];
}

export interface TriviaCategoriesEntity {
  id: number;
  name: string;
}
