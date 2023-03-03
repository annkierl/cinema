import { Movie, Shows } from '../../home/showing/Showings/interfaces';

export const Films = 'Films';
export const Show = 'Show';

export interface FilmsState {
  films: Movie[];
}

export interface ShowState {
  shows: Shows[];
}
