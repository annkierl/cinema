import { Screen, Film } from 'src/app/features/home/showing/Showings/interfaces';
export const initialScreen: Screen = {
  id: 0,
  name: '',
  rows: 10,
  colu: 10,
  specialSeats: [''],
};
export const initialFilm: Film = {
  id: 0,
  img: '',
  genre: '',
  title: '',
  length: '',
  descriptionShort: '',
  descriptionLong: '',
  ageRest: '',
  director: '',
  actors: [],
  boxOff: '',
  premiere: false,
  dateId: 0,
  addToFav: false,
};
