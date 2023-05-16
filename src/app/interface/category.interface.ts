export interface ICategory {
  trivia_categories: ITriviaCategoriesEntity[];
}

export interface ITriviaCategoriesEntity {
  id: number;
  name: string;
}
