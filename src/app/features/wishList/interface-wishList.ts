export const initialWishList: Wish[] = [
  {
    id: 0,
    movieId: 0,
    movieTitle: '',
  },
];

export interface Wish {
  id: number;
  movieId: number;
  movieTitle: string;
}
